'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Transaction } from '@/lib/types';

export default function PaymentsPage() {
  const { users, transactions, updateTransaction } = useApp();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const filteredTransactions = useMemo(() => {
    if (!selectedUserId) return transactions;
    return transactions.filter(tx => tx.userId === selectedUserId);
  }, [transactions, selectedUserId]);

  const selectedUserName = useMemo(() => {
    if (!selectedUserId) return null;
    return users.find(u => u.id === selectedUserId)?.name || null;
  }, [users, selectedUserId]);


  const handleUpdateStatus = (tx: Transaction, status: 'Completed' | 'Failed') => {
    updateTransaction({ ...tx, status });
  };
  
  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Payment Management</h1>
            <p className="text-muted-foreground">View and monitor all app transactions.</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedUserName ? `Transactions for ${selectedUserName}` : 'All Transactions'}</CardTitle>
                <CardDescription>
                  {selectedUserName ? 'A log of all payments for this user.' : 'A log of all payments, withdrawals, and fees. Click a user to filter.'}
                </CardDescription>
              </div>
              {selectedUserId && (
                <Button variant="outline" onClick={() => setSelectedUserId(null)}>
                  <FilterX className="mr-2 h-4 w-4" />
                  Clear Filter
                </Button>
              )}
            </div>
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <Button
                        variant="link"
                        onClick={() => setSelectedUserId(tx.userId)}
                        className="p-0 h-auto font-medium text-left text-foreground hover:underline"
                        disabled={selectedUserId === tx.userId}
                      >
                        {tx.userName}
                      </Button>
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
                    <TableCell className="text-right">
                      {tx.type === 'Withdrawal' && tx.status === 'Pending' && (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="border-positive text-positive hover:bg-positive/10 hover:text-positive" onClick={() => handleUpdateStatus(tx, 'Completed')}>
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleUpdateStatus(tx, 'Failed')}>
                            Deny
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
