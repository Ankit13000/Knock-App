'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, DollarSign, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Transaction, User } from '@/lib/types';
import { GlobalAddFundsForm } from '@/components/admin/GlobalAddFundsForm';
import { useToast } from '@/hooks/use-toast';

export default function PaymentsPage() {
  const { users, transactions, updateTransaction, updateUser, addTransaction } = useApp();
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const { toast } = useToast();

  const handleUpdateStatus = (tx: Transaction, status: 'Completed' | 'Failed') => {
    updateTransaction({ ...tx, status });
  };
  
  const handleAddFunds = ({ userId, amount }: { userId: string, amount: number }) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    updateUser({ ...user, walletBalance: user.walletBalance + amount });

    const newTransaction: Transaction = {
      id: `txn_${new Date().getTime()}`,
      userId: user.id,
      userName: user.name,
      type: 'Deposit',
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
    };
    addTransaction(newTransaction);

    toast({ title: 'Funds Added', description: `₹${amount.toLocaleString()} added to ${user.name}'s wallet.` });
    setIsAddFundsOpen(false);
  };


  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Payment Management</h1>
            <p className="text-muted-foreground">View and monitor all app transactions.</p>
          </div>
          <Button onClick={() => setIsAddFundsOpen(true)}>
            <DollarSign className="mr-2 h-4 w-4" />
            Add Funds
          </Button>
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
                  <TableHead className="text-right">Actions</TableHead>
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
      <GlobalAddFundsForm 
        isOpen={isAddFundsOpen}
        onOpenChange={setIsAddFundsOpen}
        onSave={handleAddFunds}
        users={users}
      />
    </>
  );
}
