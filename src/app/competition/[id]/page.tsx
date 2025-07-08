'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ChevronLeft, Ticket, Trophy, Users, Clock } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function CompetitionDetailPage({ params }: { params: { id: string } }) {
  const { competitions } = useApp();
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

  const progress = (competition.participants / competition.totalSpots) * 100;

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
            <p className="text-center text-sm text-muted-foreground mt-2">{competition.totalSpots - competition.participants} spots left!</p>
          </div>
          
          <Link href={`/game/find-the-difference?id=${competition.id}`} className="w-full">
            <Button size="lg" className="w-full btn-gradient text-lg h-12">
                Join Now
            </Button>
          </Link>

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
