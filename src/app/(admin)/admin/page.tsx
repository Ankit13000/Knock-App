'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/admin/StatCard";
import { RecentUsersChart } from "@/components/admin/RecentUsersChart";
import { Users, Trophy, DollarSign, Activity } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function AdminDashboardPage() {
  const { competitions } = useApp();
  const recentCompetitions = competitions.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of the app's performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="₹1,25,430" icon={DollarSign} change="+5.2% this month" />
        <StatCard title="Active Users" value="1,245" icon={Users} change="+120 this month" />
        <StatCard title="Competitions" value="58" icon={Trophy} change="+3 live now" />
        <StatCard title="User Activity" value="2,304" icon={Activity} change="-2.1% today" />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>New Users Overview</CardTitle>
            <CardDescription>Monthly new user registrations.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentUsersChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
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
    </div>
  );
}
