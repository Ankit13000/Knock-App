'use client';

import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function PaymentsPage() {
  const { transactions } = useApp();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">Payment Management</h1>
        <p className="text-muted-foreground">View and monitor all app transactions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>A log of all payments, withdrawals, and fees.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                   <TableCell>
                    <span className="font-medium">{tx.userName}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <span className={cn('flex h-8 w-8 items-center justify-center rounded-full bg-secondary',
                            (tx.type === 'Deposit' || tx.type === 'Winnings') ? 'text-positive' : 'text-destructive'
                        )}>
                            {(tx.type === 'Deposit' || tx.type === 'Winnings') ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                        </span>
                        <span className="font-medium">{tx.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                  <TableCell>
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', 
                        tx.status === 'Completed' ? 'bg-positive/20 text-positive' : 
                        tx.status === 'Pending' ? 'bg-accent/20 text-accent' : 
                        'bg-destructive/20 text-destructive'
                    )}>
                        {tx.status}
                    </span>
                  </TableCell>
                  <TableCell className={cn('text-right font-mono font-semibold', tx.amount > 0 ? 'text-positive' : 'text-destructive')}>
                    {tx.amount > 0 ? `+₹${tx.amount.toLocaleString()}` : `-₹${Math.abs(tx.amount).toLocaleString()}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
