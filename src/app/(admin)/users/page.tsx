'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getInitials } from "@/lib/utils";
import { MoreHorizontal, Edit, Trash2, PlusCircle, Ban } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { UserForm } from "@/components/admin/UserForm";
import { BanUserForm } from "@/components/admin/BanUserForm";
import type { User, Transaction } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { sendNotification } from "@/ai/flows/send-notification-flow";

export default function UsersPage() {
  const { users, addUser, updateUser, deleteUser, addTransaction } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToBan, setUserToBan] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBanFormOpen, setIsBanFormOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(lowerCaseQuery) ||
      user.email.toLowerCase().includes(lowerCaseQuery)
    );
  }, [users, searchQuery]);

  const handleCreate = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
    toast({ title: "Success", description: "User has been deleted." });
  };

  const handleSave = (userData: User) => {
    if (selectedUser) { // If there was a selected user, it's an edit.
      updateUser(userData);
      toast({ title: "Success", description: "User information updated." });
    } else { // Otherwise, it's a create.
      addUser({ ...userData, isBanned: false });
      toast({ title: "Success", description: "User created successfully." });
    }
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const handleAddFunds = (userId: string, amount: number) => {
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
  };
  
  const handleBanUser = (user: User) => {
    setUserToBan(user);
    setIsBanFormOpen(true);
  };
  
  const handleUnbanUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    updateUser({
        ...user,
        isBanned: false,
        banReason: undefined,
        banExpiresAt: null,
    });
    toast({ title: "User Unbanned", description: `${user.name} has been unbanned.` });
  };

  const handleConfirmBan = async (userId: string, reason: string, durationDays: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + durationDays);

    updateUser({
        ...user,
        isBanned: true,
        banReason: reason,
        banExpiresAt: expiryDate.toISOString().split('T')[0],
    });

    try {
        await sendNotification({
            title: "Account Suspended",
            message: `Your account has been temporarily suspended for ${durationDays} days. Reason: ${reason}. Your access will be restored on ${expiryDate.toLocaleDateString()}.`,
        });
        toast({ title: "User Banned", description: `${user.name} has been banned for ${durationDays} days.` });
    } catch (error) {
        toast({ variant: 'destructive', title: "Notification Failed", description: "The user was banned, but the notification could not be sent." });
    }
    
    setIsBanFormOpen(false);
    setUserToBan(null);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
           <div>
            <h1 className="text-3xl font-bold tracking-tighter">User Management</h1>
            <p className="text-muted-foreground">View and manage all registered users.</p>
          </div>
           <Button onClick={handleCreate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>A list of all users in the app.</CardDescription>
            <div className="pt-4">
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Games Played</TableHead>
                  <TableHead>Wallet</TableHead>
                  <TableHead className="text-right">Total Earned</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className={cn(user.isBanned && 'bg-destructive/10')}>
                    <TableCell>
                       <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar || undefined} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <Link href={`/admin/users/${user.id}`} className="font-medium hover:underline">{user.name}</Link>
                            {user.isBanned && (
                              <Badge variant="destructive" className="ml-2 text-xs">Banned</Badge>
                            )}
                          </div>
                        </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{user.totalGames}</TableCell>
                    <TableCell className="font-mono">₹{user.walletBalance.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono">₹{user.totalEarned.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            {user.isBanned ? (
                                <DropdownMenuItem onClick={() => handleUnbanUser(user.id)}>
                                    <Ban className="mr-2 h-4 w-4 text-positive" />
                                    <span>Unban User</span>
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem onClick={() => handleBanUser(user)} className="text-destructive focus:text-destructive">
                                    <Ban className="mr-2 h-4 w-4" />
                                    <span>Ban User</span>
                                </DropdownMenuItem>
                            )}
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete User</span>
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the user's account.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(user.id)} className={cn(buttonVariants({ variant: "destructive" }))}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <UserForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSave}
        onAddFunds={handleAddFunds}
        user={selectedUser}
      />
      <BanUserForm
        isOpen={isBanFormOpen}
        onOpenChange={setIsBanFormOpen}
        onSave={handleConfirmBan}
        user={userToBan}
      />
    </>
  );
}
