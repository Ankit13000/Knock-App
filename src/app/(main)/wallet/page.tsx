'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, Minus, Plus, Wallet } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import type { Transaction } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const quickAddAmounts = [100, 250, 500];

export default function WalletPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const { transactions, addTransaction } = useApp();
  const [customAmount, setCustomAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  if (!user) {
    return null; // Or a loading component
  }
  
  const userTransactions = transactions.filter(tx => tx.userId === user.id);

  const handleAddMoney = async (amount: number) => {
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid positive number.',
      });
      return;
    }

    const userDocRef = doc(db, 'users', user.id);
    try {
      await updateDoc(userDocRef, { walletBalance: increment(amount) });
      
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        type: 'Deposit',
        amount: amount,
        date: new Date().toISOString().split('T')[0],
        status: 'Completed',
      };
      addTransaction(newTransaction);
      
      setCustomAmount('');
      toast({
        title: 'Success!',
        description: `₹${amount.toLocaleString()} has been added to your wallet.`,
      });

    } catch (error) {
      console.error("Failed to add funds: ", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add funds to your wallet.',
      });
    }
  };

  const handleCustomAmountSubmit = () => {
    const amount = parseFloat(customAmount);
    handleAddMoney(amount);
  }

  const handleWithdrawMoney = async (amount: number) => {
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid positive number.',
      });
      return;
    }

    if (amount > user.walletBalance) {
      toast({
        variant: 'destructive',
        title: 'Insufficient Funds',
        description: `You can't withdraw more than your balance of ₹${user.walletBalance.toLocaleString()}.`,
      });
      return;
    }

    const userDocRef = doc(db, 'users', user.id);
    try {
      await updateDoc(userDocRef, { walletBalance: increment(-amount) });

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        type: 'Withdrawal',
        amount: -amount,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
      };
      addTransaction(newTransaction);
      setWithdrawAmount('');
      toast({
        title: 'Withdrawal Initiated',
        description: `Your request to withdraw ₹${amount.toLocaleString()} has been submitted.`,
      });
    } catch (error) {
       console.error("Failed to withdraw funds: ", error);
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to process your withdrawal request.',
      });
    }
  };

  const handleCustomWithdrawSubmit = () => {
    const amount = parseFloat(withdrawAmount);
    handleWithdrawMoney(amount);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">My Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and transactions.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-1">
            <Card className="text-center">
                <CardHeader>
                    <Wallet className="w-12 h-12 mx-auto text-primary" />
                    <CardTitle className="text-4xl font-bold tracking-tighter">₹{user.walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CardTitle>
                    <CardDescription>Current Balance</CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Add Money</CardTitle>
                    <CardDescription>Choose an amount to add to your wallet.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                        {quickAddAmounts.map(amount => (
                            <Button key={amount} variant="outline" onClick={() => handleAddMoney(amount)}>₹{amount}</Button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <Input 
                          type="number" 
                          placeholder="Custom Amount"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleCustomAmountSubmit();
                            }
                          }}
                        />
                        <Button className="btn-gradient" onClick={handleCustomAmountSubmit}>
                            <Plus className="h-4 w-4 mr-2" /> Add
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">Powered by Razorpay, UPI, Cards</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Withdraw Money</CardTitle>
                    <CardDescription>Request a withdrawal to your bank account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Input 
                          type="number" 
                          placeholder="Withdrawal Amount"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleCustomWithdrawSubmit();
                            }
                          }}
                        />
                        <Button variant="outline" onClick={handleCustomWithdrawSubmit}>
                            <Minus className="h-4 w-4 mr-2" /> Withdraw
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">Withdrawals may take 2-3 business days.</p>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userTransactions.map(tx => (
                                <TableRow key={tx.id}>
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
      </div>
    </div>
  );
}
