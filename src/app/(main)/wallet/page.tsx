import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockTransactions, mockUser } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, Plus, Wallet } from 'lucide-react';

const quickAddAmounts = [100, 250, 500];

export default function WalletPage() {
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
                    <CardTitle className="text-4xl font-bold tracking-tighter">₹{mockUser.walletBalance.toLocaleString()}</CardTitle>
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
                            <Button key={amount} variant="outline">₹{amount}</Button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <Input type="number" placeholder="Custom Amount" />
                        <Button className="btn-gradient">
                            <Plus className="h-4 w-4 mr-2" /> Add
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">Powered by Razorpay, UPI, Cards</p>
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
                            {mockTransactions.map(tx => (
                                <TableRow key={tx.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className={cn('flex h-8 w-8 items-center justify-center rounded-full bg-secondary',
                                                (tx.type === 'Deposit' || tx.type === 'Winnings') ? 'text-green-500' : 'text-red-500'
                                            )}>
                                                {(tx.type === 'Deposit' || tx.type === 'Winnings') ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                                            </span>
                                            <span className="font-medium">{tx.type}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                                    <TableCell>
                                        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', 
                                            tx.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 
                                            tx.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                                            'bg-red-500/20 text-red-400'
                                        )}>
                                            {tx.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className={cn('text-right font-mono font-semibold', (tx.amount > 0) ? 'text-green-400' : 'text-foreground')}>
                                        {tx.amount > 0 ? `+₹${tx.amount}` : `-₹${Math.abs(tx.amount)}`}
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
