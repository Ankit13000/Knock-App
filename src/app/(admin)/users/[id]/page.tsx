'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Edit, Wallet, Gamepad2, Trophy, DollarSign, Users, Ban } from 'lucide-react';
import { getInitials, cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { UserForm } from '@/components/admin/UserForm';
import type { User, Transaction } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function UserDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { users, transactions, updateUser, addTransaction } = useApp();
    const { toast } = useToast();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const userId = params.id as string;
    const user = users.find(u => u.id === userId);
    const userTransactions = transactions.filter(tx => tx.userId === userId);

    if (!user) {
        return (
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold">User not found</h1>
                <Button asChild className="mt-4">
                    <Link href="/admin/users">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Users
                    </Link>
                </Button>
            </div>
        )
    }

    const handleSave = (userData: User) => {
        updateUser(userData);
        toast({ title: "Success", description: "User information updated." });
        setIsFormOpen(false);
    };

    const handleAddFunds = (userId: string, amount: number) => {
        const userToUpdate = users.find(u => u.id === userId);
        if (!userToUpdate) return;

        updateUser({ ...userToUpdate, walletBalance: userToUpdate.walletBalance + amount });

        const newTransaction: Transaction = {
          id: `txn_${new Date().getTime()}`,
          userId: userToUpdate.id,
          userName: userToUpdate.name,
          type: 'Deposit',
          amount: amount,
          date: new Date().toISOString().split('T')[0],
          status: 'Completed',
        };
        addTransaction(newTransaction);

        toast({ title: 'Funds Added', description: `₹${amount.toLocaleString()} added to ${userToUpdate.name}'s wallet.` });
    };


    const stats = [
        { label: 'Wallet Balance', value: `₹${user.walletBalance.toLocaleString()}`, icon: Wallet },
        { label: 'Total Games', value: user.totalGames, icon: Gamepad2 },
        { label: 'Total Wins', value: user.wins, icon: Trophy },
        { label: 'Total Earned', value: `₹${user.totalEarned.toLocaleString()}`, icon: DollarSign },
    ];

    return (
        <>
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <Button variant="ghost" onClick={() => router.back()} className="mb-4 -ml-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Users
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tighter">User Details</h1>
                    <p className="text-muted-foreground">Comprehensive overview of {user.name}.</p>
                </div>
                <Button onClick={() => setIsFormOpen(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit User
                </Button>
            </div>

            {user.isBanned && (
                <Card className="border-destructive bg-destructive/5">
                    <CardHeader>
                        <CardTitle className="text-destructive flex items-center gap-2">
                            <Ban className="h-5 w-5" />
                            User Banned
                        </CardTitle>
                        <CardDescription className="text-destructive/80">
                            This user's account is suspended.
                        </CardDescription>
                    </CardHeader>
                    {user.banReason && (
                         <CardContent className="text-sm">
                            <p><strong>Reason:</strong> {user.banReason}</p>
                            <p><strong>Ban Expires:</strong> {user.banExpiresAt ? new Date(user.banExpiresAt).toLocaleDateString() : 'N/A'}</p>
                        </CardContent>
                    )}
                </Card>
            )}

            <Card>
                <CardHeader className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
                    <Avatar className="h-24 w-24 border-4 border-primary">
                        <AvatarImage src={user.avatar || undefined} alt={user.name} />
                        <AvatarFallback className="text-3xl">{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left">
                        <CardTitle className="text-2xl flex items-center gap-2">
                          {user.name}
                          {user.isBanned && <Badge variant="destructive">Banned</Badge>}
                        </CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                        <p className="text-sm text-muted-foreground mt-1">Joined on {user.joinDate}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <Separator className="my-4"/>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map(stat => (
                            <div key={stat.label} className="p-4 bg-secondary rounded-lg text-center">
                                <stat.icon className="w-8 h-8 mx-auto text-primary mb-2" />
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>Last 5 transactions for this user.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                             <TableHeader>
                                <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {userTransactions.slice(0, 5).map(tx => (
                                    <TableRow key={tx.id}>
                                        <TableCell className="font-medium">{tx.type}</TableCell>
                                        <TableCell>{tx.date}</TableCell>
                                        <TableCell className={cn(
                                            'text-right font-mono font-semibold',
                                            tx.amount > 0 ? 'text-positive' : 'text-destructive'
                                        )}>
                                            {tx.amount > 0 ? `+₹${tx.amount.toLocaleString()}` : `-₹${Math.abs(tx.amount).toLocaleString()}`}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {userTransactions.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                                            No transactions found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Referrals</CardTitle>
                        <CardDescription>Users referred by {user.name}.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-full">
                         <div className="text-center text-muted-foreground">
                            <Users className="mx-auto h-12 w-12" />
                            <p className="mt-4">Referral data not yet available.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
        </div>
        <UserForm
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            onSave={handleSave}
            onAddFunds={handleAddFunds}
            user={user}
        />
        </>
    );
}
