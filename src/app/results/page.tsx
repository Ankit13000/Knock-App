import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Repeat, Trophy, CheckCircle, Award } from 'lucide-react';
import { mockUser } from '@/lib/mock-data';

export default function ResultsPage() {
  const score = 1250;
  const rank = 3;
  const winnings = 250;

  const stats = [
    { icon: CheckCircle, label: 'Your Score', value: score.toLocaleString(), color: 'text-accent' },
    { icon: Trophy, label: 'Your Rank', value: `#${rank}`, color: 'text-accent' },
    { icon: Award, label: 'Winnings', value: `₹${winnings.toLocaleString()}`, color: 'text-positive' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-grid-pattern p-4">
      <Card className="w-full max-w-md text-center shadow-2xl shadow-primary/10">
        <CardHeader>
          <Trophy className="mx-auto h-16 w-16 text-accent" />
          <CardTitle className="text-3xl font-bold tracking-tighter">
            {winnings > 0 ? "Congratulations!" : "Good Game!"}
          </CardTitle>
          <CardDescription>Here's how you performed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(stat => (
              <div key={stat.label} className="p-4 bg-card rounded-lg">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <h4 className="font-semibold text-foreground">Next Steps</h4>
            <p className="text-sm text-muted-foreground">Check the full leaderboard for final standings.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/home" className="w-full">
                <Button variant="outline" className="w-full">
                    <Home className="mr-2 h-4 w-4" /> Go to Home
                </Button>
            </Link>
            <Link href="/home" className="w-full">
                <Button className="w-full btn-gradient">
                    <Repeat className="mr-2 h-4 w-4" /> Play Again
                </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
