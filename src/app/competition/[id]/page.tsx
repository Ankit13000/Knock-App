'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ChevronLeft, Ticket, Trophy, Users, Clock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import type { Transaction } from '@/lib/types';
import { ToastAction } from '@/components/ui/toast';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CompetitionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { competitions, addTransaction, updateCompetition } = useApp();
  const { user } = useUser();
  const { toast } = useToast();
  
  const competition = competitions.find(c => c.id === params.id);

  if (!competition) {
    return (
       <div className="container mx-auto max-w-4xl py-8 text-center">
        <h1 className="text-2xl font-bold">Competition not found</h1>
        <p className="text-muted-foreground">The competition may have been removed or the link is invalid.</p>
        <Button asChild className="mt-4">
          <Link href="/home">Return to competitions</Link>
        </Button>
      </div>
    )
  }

  const handleJoin = async () => {
    if (!competition || !user) return;

    if (competition.participants >= competition.totalSpots) {
        toast({
            variant: 'destructive',
            title: 'Competition Full',
            description: 'Sorry, all spots for this competition have been taken.',
        });
        return;
    }

    if (user.walletBalance < competition.entryFee) {
      toast({
        variant: 'destructive',
        title: 'Insufficient Funds',
        description: `You need ₹${competition.entryFee.toFixed(2)} to join. Your balance is ₹${user.walletBalance.toFixed(2)}.`,
        action: (
          <ToastAction altText="Add Funds" onClick={() => router.push('/wallet')}>
            Add Funds
          </ToastAction>
        ),
      });
      return;
    }

    const userDocRef = doc(db, 'users', user.id);
    try {
      // Atomically update wallet balance and game count in Firestore
      await updateDoc(userDocRef, {
        walletBalance: increment(-competition.entryFee),
        totalGames: increment(1),
      });
      
      // Create a new transaction
      const newTransaction: Transaction = {
        id: `txn_${new Date().getTime()}`,
        userId: user.id,
        userName: user.name,
        type: 'Entry Fee',
        amount: -competition.entryFee,
        date: new Date().toISOString().split('T')[0],
        status: 'Completed',
      };
      addTransaction(newTransaction);
      
      // Update competition participant count locally (could also be a Firestore transaction)
      const updatedCompetition = {
        ...competition,
        participants: competition.participants + 1,
      };
      updateCompetition(updatedCompetition);

      toast({
        title: 'Joined Competition!',
        description: `₹${competition.entryFee} has been deducted from your wallet. Good luck!`,
      });

      router.push(`/game/find-the-difference?id=${competition.id}`);

    } catch (error) {
      console.error("Failed to join competition:", error);
      toast({
        variant: 'destructive',
        title: 'Join Failed',
        description: 'Could not process your entry. Please try again.',
      });
    }
  };

  const progress = (competition.participants / competition.totalSpots) * 100;
  const isFull = competition.participants >= competition.totalSpots;

  const details = [
    { icon: Trophy, label: 'Prize Pool', value: `₹${competition.prize}`, color: 'text-amber-400' },
    { icon: Ticket, label: 'Entry Fee', value: `₹${competition.entryFee}`, color: 'text-primary' },
    { icon: Users, label: 'Participants', value: `${competition.participants} / ${competition.totalSpots}`, color: 'text-accent' },
    { icon: Clock, label: 'Starts', value: competition.startTime, color: 'text-muted-foreground' },
  ];

  return (
    <div className="container mx-auto max-w-4xl py-8">
       <Link href="/home" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
          <ChevronLeft className="h-4 w-4" />
          Back to competitions
        </Link>
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <Image
            src={competition.image}
            alt={competition.title}
            width={800}
            height={400}
            className="w-full aspect-video object-cover"
            data-ai-hint={competition.imageHint}
          />
        </CardHeader>
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold tracking-tighter mb-2">{competition.title}</h1>
          <p className="text-muted-foreground mb-6">Game Type: {competition.gameType}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {details.map(detail => (
              <div key={detail.label} className="p-4 bg-card rounded-lg text-center">
                <detail.icon className={`w-8 h-8 mx-auto mb-2 ${detail.color}`} />
                <p className="text-xl font-bold">{detail.value}</p>
                <p className="text-sm text-muted-foreground">{detail.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
              <div className="absolute h-full bg-gradient-to-r from-primary to-accent transition-all" style={{width: `${progress}%`}}></div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">{isFull ? 'Competition is full!' : `${competition.totalSpots - competition.participants} spots left!`}</p>
          </div>
          
          <Button size="lg" className="w-full btn-gradient text-lg h-12" onClick={handleJoin} disabled={isFull || !user}>
            {isFull ? 'Competition Full' : (user ? 'Join Now' : 'Login to Join')}
          </Button>

          <div className="mt-8 p-4 bg-secondary rounded-lg text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" /> Rules & Conditions
            </h3>
            <ul className="list-disc pl-5 space-y-1">
                <li>This is a skill-based game.</li>
                <li>Entry fee is non-refundable.</li>
                <li>Winnings will be credited to your wallet within 24 hours.</li>
                <li>In case of a tie, the prize will be split equally.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
