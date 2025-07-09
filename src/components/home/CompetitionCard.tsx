import Link from 'next/link';
import Image from 'next/image';
import { Users, Ticket, Trophy } from 'lucide-react';
import type { Competition } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CompetitionCardProps = {
  competition: Competition;
};

const statusVariants: Record<Competition['status'], BadgeProps['variant']> = {
  Live: 'positive',
  Upcoming: 'default',
  Results: 'outline',
};

export function CompetitionCard({ competition }: CompetitionCardProps) {
  const progress = (competition.participants / competition.totalSpots) * 100;

  return (
    <Card className="overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="relative p-0">
        <Image
          src={competition.image}
          alt={competition.title}
          width={400}
          height={200}
          className="aspect-video w-full object-cover"
          data-ai-hint={competition.imageHint}
        />
        <Badge
          variant={statusVariants[competition.status]}
          className={cn(
            'absolute top-2 right-2',
            competition.status === 'Live' && 'animate-pulse shadow-lg shadow-positive/50'
          )}
        >
          {competition.status}
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold tracking-tight">{competition.title}</h3>
        <div className="mt-2 flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-accent" />
            <span className="font-semibold text-foreground">₹{competition.prize}</span>
          </div>
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-primary" />
            <span>₹{competition.entryFee}</span>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>
                {competition.participants} / {competition.totalSpots}
              </span>
            </div>
            <span>{competition.timeLeft}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/competition/${competition.id}`} className="w-full">
          <Button className="w-full btn-gradient">
            {competition.status === 'Live' ? 'Play Now' : 'View Details'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
