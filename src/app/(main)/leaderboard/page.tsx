import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockLeaderboard, mockUser } from '@/lib/mock-data';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LeaderboardPage() {
  const renderLeaderboardTable = (data: typeof mockLeaderboard) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">Score</TableHead>
          <TableHead className="text-right">Prize</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((entry, index) => (
          <TableRow key={entry.rank} className={cn(entry.name === mockUser.name && 'bg-primary/10')}>
            <TableCell className="font-bold text-lg">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-card">
                    {index === 0 && <Crown className="w-6 h-6 text-amber-400" />}
                    {index > 0 && entry.rank}
                </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={entry.avatar || undefined} alt={entry.name} />
                  <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{entry.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-right font-mono">{entry.score.toLocaleString()}</TableCell>
            <TableCell className="text-right font-semibold text-green-400">₹{entry.prize.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">Leaderboard</h1>
        <p className="text-muted-foreground">See who's topping the charts.</p>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="weekly">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="all-time">All-Time</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
              <CardContent className="p-0 pt-4">
                {renderLeaderboardTable(mockLeaderboard)}
              </CardContent>
            </TabsContent>
            <TabsContent value="weekly">
              <CardContent className="p-0 pt-4">
                {renderLeaderboardTable(mockLeaderboard)}
              </CardContent>
            </TabsContent>
            <TabsContent value="all-time">
              <CardContent className="p-0 pt-4">
                {renderLeaderboardTable(mockLeaderboard)}
              </CardContent>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}
