'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { User } from '@/lib/types';
import { Ban } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const banSchema = z.object({
  userId: z.string().min(1, 'You must select a user to ban.'),
  banReason: z.string().min(10, 'Reason must be at least 10 characters long.'),
  banDuration: z.coerce.number().int().min(1, 'Duration must be at least 1 day.'),
});

type BanFormValues = z.infer<typeof banSchema>;

interface GlobalBanUserFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (userId: string, reason: string, duration: number) => void;
  users: User[];
}

export function GlobalBanUserForm({ isOpen, onOpenChange, onSave, users }: GlobalBanUserFormProps) {
  const form = useForm<BanFormValues>({
    resolver: zodResolver(banSchema),
    defaultValues: {
      userId: '',
      banReason: '',
      banDuration: 7,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset({ userId: '', banReason: '', banDuration: 7 });
    }
  }, [isOpen, form]);

  const onSubmit = (data: BanFormValues) => {
    onSave(data.userId, data.banReason, data.banDuration);
  };

  const availableUsers = users.filter(u => !u.isBanned);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ban className="h-5 w-5 text-destructive" />
            Ban a User
          </DialogTitle>
          <DialogDescription>
            Select a user, then specify the reason and duration for the ban.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
             <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User to Ban</FormLabel>
                   <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableUsers.map((user) => (
                         <SelectItem key={user.id} value={user.id}>{user.name} ({user.email})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="banDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ban Duration (in days)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 7" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="banReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Ban</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Explain why this user is being banned..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" variant="destructive">Confirm Ban</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
