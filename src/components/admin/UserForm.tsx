'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { User } from '@/lib/types';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (userData: User) => void;
  user: User | null;
}

export function UserForm({ isOpen, onOpenChange, onSave, user }: UserFormProps) {
  const isCreateMode = user === null;

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
      } else {
        form.reset({
          name: user.name,
          email: user.email,
        });
      }
    }
  }, [user, form, isOpen, isCreateMode]);

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
      };
      onSave(newUser);
    } else {
      const updatedUser: User = {
        ...user!,
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
              : "Update the user's details. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            {!isCreateMode && (
              <FormItem>
                <FormLabel>User ID</FormLabel>
                <FormControl>
                  <Input readOnly disabled value={user!.id} />
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
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">{isCreateMode ? 'Create User' : 'Save Changes'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
