'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { User } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { DollarSign } from 'lucide-react';
import { Label } from '@/components/ui/label';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (userData: User) => void;
  onAddFunds: (userId: string, amount: number) => void;
  user: User | null;
}

export function UserForm({ isOpen, onOpenChange, onSave, onAddFunds, user }: UserFormProps) {
  const isCreateMode = user === null;
  const [amountToAdd, setAmountToAdd] = useState('');

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isCreateMode) {
        form.reset({ name: '', email: '' });
      } else if (user) {
        form.reset({
          name: user.name,
          email: user.email,
        });
      }
      setAmountToAdd('');
    }
  }, [user, form, isOpen, isCreateMode]);
  
  const handleAddFundsClick = () => {
    const amount = parseFloat(amountToAdd);
    if (user && !isNaN(amount) && amount > 0) {
      onAddFunds(user.id, amount);
      setAmountToAdd(''); // Reset after adding
    }
  };

  const onSubmit = (data: UserFormValues) => {
    if (isCreateMode) {
      const newUser: User = {
        id: `usr_${new Date().getTime()}`,
        name: data.name,
        email: data.email,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: null,
        walletBalance: 0,
        wins: 0,
        totalGames: 0,
        totalEarned: 0,
        isBanned: false,
      };
      onSave(newUser);
    } else if (user) {
      const updatedUser: User = {
        ...user,
        name: data.name,
        email: data.email,
      };
      onSave(updatedUser);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isCreateMode ? 'Create New User' : 'Edit User'}</DialogTitle>
          <DialogDescription>
            {isCreateMode
              ? "Fill in the details for the new user."
              : "Update user details or add funds to their wallet."}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="user-details-form" className="space-y-4 py-4">
              {!isCreateMode && user && (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input readOnly disabled value={user.id} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="User's full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="user@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {!isCreateMode && user && (
            <>
              <Separator className="my-4" />
              <div className="space-y-4 py-4">
                <h4 className="font-medium flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-positive" />
                  Wallet Management
                </h4>
                <p className="text-sm text-muted-foreground">
                  Current Balance: ₹{user.walletBalance.toLocaleString()}
                </p>
                <div className="flex items-end gap-2">
                  <div className="flex-grow space-y-2">
                    <Label htmlFor="add-funds-amount">Add Funds (₹)</Label>
                    <Input
                      id="add-funds-amount"
                      type="number"
                      placeholder="e.g., 100"
                      value={amountToAdd}
                      onChange={(e) => setAmountToAdd(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleAddFundsClick} disabled={!amountToAdd || parseFloat(amountToAdd) <= 0}>Add</Button>
                </div>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button type="submit" form="user-details-form">{isCreateMode ? 'Create User' : 'Save Changes'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
