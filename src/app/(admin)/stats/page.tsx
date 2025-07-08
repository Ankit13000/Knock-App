'use client';

import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell, Legend } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const revenueChartData = [
  { month: "Jan", revenue: 4500 },
  { month: "Feb", revenue: 5200 },
  { month: "Mar", revenue: 6100 },
  { month: "Apr", revenue: 7300 },
  { month: "May", revenue: 8400 },
  { month: "Jun", revenue: 9500 },
];
const revenueChartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
} satisfies ChartConfig;


const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))"];

export default function StatsPage() {
  const { users, competitions } = useApp();

  const topUsers = [...users].sort((a, b) => b.totalEarned - a.totalEarned).slice(0, 5);

  const competitionPopularity = competitions.reduce((acc, comp) => {
    const gameType = comp.gameType;
    if (!acc[gameType]) {
      acc[gameType] = { name: gameType, participants: 0 };
    }
    acc[gameType].participants += comp.participants;
    return acc;
  }, {} as Record<string, {name: string, participants: number}>);
  
  const popularityData = Object.values(competitionPopularity);
  const completedCompetitions = competitions.filter(comp => comp.status === 'Results');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">App Statistics</h1>
        <p className="text-muted-foreground">In-depth analytics and performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Monthly revenue from competition entry fees.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueChartConfig} className="min-h-[300px] w-full">
              <BarChart data={revenueChartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competition Popularity</CardTitle>
            <CardDescription>Participants by game type.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
             <ChartContainer config={{}} className="min-h-[300px] w-full">
               <PieChart>
                 <Pie data={popularityData} dataKey="participants" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                    {popularityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                 </Pie>
                 <Legend />
                 <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
               </PieChart>
             </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Earning Users</CardTitle>
          <CardDescription>The top 5 users by total earnings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Games Played</TableHead>
                <TableHead className="text-right">Total Earned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-bold">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar || undefined} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.totalGames}</TableCell>
                  <TableCell className="text-right font-mono font-bold">₹{user.totalEarned.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Competitions</CardTitle>
          <CardDescription>A breakdown of revenue from past competitions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Competition</TableHead>
                <TableHead>Game Type</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead className="text-right">Total Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedCompetitions.length > 0 ? (
                completedCompetitions.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell className="font-medium">{comp.title}</TableCell>
                    <TableCell>{comp.gameType}</TableCell>
                    <TableCell>{comp.participants}</TableCell>
                    <TableCell className="text-right font-mono">
                      ₹{(comp.entryFee * comp.participants).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No completed competitions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
