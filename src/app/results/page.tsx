'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Repeat, Trophy, CheckCircle, Award, XCircle, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';


// This is a simplified calculation. A real app might fetch this from a server.
function calculateResults(score: number) {
    if (score === 0) return { rank: '-', winnings: 0 };
    if (score > 1500) return { rank: 1, winnings: 500 };
    if (score > 1000) return { rank: 3, winnings: 250 };
    if (score > 500) return { rank: 10, winnings: 50 };
    return { rank: '50+', winnings: 0 };
}


function ResultsPageContent() {
  const searchParams = useSearchParams();
  const scoreParam = searchParams.get('score');
  const statusParam = searchParams.get('status');

  const isForfeited = statusParam === 'forfeited';
  const isLost = statusParam === 'lost';
  const isGameOver = isForfeited || isLost;
  const score = isGameOver ? 0 : parseInt(scoreParam || '0', 10);
  
  const { rank, winnings } = calculateResults(score);
  
  let title;
  let description;

  if (isForfeited) {
    title = "Game Forfeited";
    description = "You left the game early.";
  } else if (isLost) {
    title = "Too Many Mistakes!";
    description = "You lost the game after 3 incorrect clicks.";
  } else if (winnings > 0) {
    title = "Congratulations!";
    description = "Here's how you performed.";
  } else {
    title = "Good Game!";
    description = "Here's how you performed.";
  }


  const stats = [
    { icon: CheckCircle, label: 'Your Score', value: score.toLocaleString(), color: 'text-accent' },
    { icon: Trophy, label: 'Your Rank', value: `#${rank}`, color: 'text-accent' },
    { icon: Award, label: 'Winnings', value: `₹${winnings.toLocaleString()}`, color: 'text-positive' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-grid-pattern p-4">
      <Card className="w-full max-w-md text-center shadow-2xl shadow-primary/10">
        <CardHeader>
          {isGameOver ? (
            <XCircle className="mx-auto h-16 w-16 text-destructive" />
          ) : (
            <Trophy className="mx-auto h-16 w-16 text-accent" />
          )}
          <CardTitle className="text-3xl font-bold tracking-tighter">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isGameOver && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map(stat => (
                <div key={stat.label} className="p-4 bg-card rounded-lg">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="p-4 bg-secondary rounded-lg">
            <h4 className="font-semibold text-foreground">Next Steps</h4>
            <p className="text-sm text-muted-foreground">
                {isGameOver ? 'Why not try another game?' : 'Check the full leaderboard for final standings.'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/home" className="w-full">
                <Button variant="outline" className="w-full">
                    <Home className="mr-2 h-4 w-4" /> Go to Home
                </Button>
            </Link>
            <Link href="/home" className="w-full">
                <Button className="w-full btn-gradient">
                    <Repeat className="mr-2 h-4 w-4" /> Play Another
                </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }>
            <ResultsPageContent />
        </Suspense>
    )
}
