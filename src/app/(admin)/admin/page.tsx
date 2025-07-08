'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/admin/StatCard";
import { RecentUsersChart } from "@/components/admin/RecentUsersChart";
import { Users, Trophy, DollarSign, Activity, Crown } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { mockLeaderboard } from "@/lib/mock-data";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { competitions, users } = useApp();
  const recentCompetitions = competitions.slice(0, 5);
  const topLeaders = mockLeaderboard.slice(0, 5);

  const totalRevenue = competitions.reduce((acc, comp) => acc + (comp.entryFee * comp.participants), 0);
  const activeUsers = users.length;
  const totalCompetitions = competitions.length;
  const liveCompetitions = competitions.filter(c => c.status === 'Live').length;
  const totalGamesPlayed = users.reduce((acc, user) => acc + user.totalGames, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of the app's performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSign} change="From all entry fees" />
        <StatCard title="Active Users" value={activeUsers.toLocaleString()} icon={Users} change="+2 this month" />
        <StatCard title="Competitions" value={totalCompetitions.toLocaleString()} icon={Trophy} change={`${liveCompetitions} live now`} />
        <StatCard title="Total Games Played" value={totalGamesPlayed.toLocaleString()} icon={Activity} change="+50 today" />
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Users Overview</CardTitle>
            <CardDescription>Monthly new user registrations.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentUsersChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leaderboard Snapshot</CardTitle>
            <CardDescription>Top 5 players this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topLeaders.map((leader, index) => (
                <div key={leader.rank} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 text-center font-bold text-lg text-muted-foreground">
                    {index === 0 ? <Crown className="w-6 h-6 text-amber-400" /> : leader.rank}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={leader.avatar || undefined} alt={leader.name} />
                    <AvatarFallback>{getInitials(leader.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="font-semibold">{leader.name}</p>
                    <p className="text-sm text-muted-foreground">{leader.score.toLocaleString()} Points</p>
                  </div>
                  <div className="font-bold text-positive">₹{leader.prize.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
          <CardHeader>
            <CardTitle>Recent Competitions</CardTitle>
            <CardDescription>A list of the most recent competitions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Prize</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCompetitions.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell className="font-medium">{comp.title}</TableCell>
                    <TableCell>
                       <Badge variant={
                          comp.status === 'Live' ? 'default' :
                          comp.status === 'Upcoming' ? 'secondary' : 'outline'
                        }>
                          {comp.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">₹{comp.prize}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  );
}
