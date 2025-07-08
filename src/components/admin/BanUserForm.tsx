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

const banSchema = z.object({
  banReason: z.string().min(10, 'Reason must be at least 10 characters.'),
  banDuration: z.coerce.number().int().min(1, 'Duration must be at least 1 day.'),
});

type BanFormValues = z.infer<typeof banSchema>;

interface BanUserFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (userId: string, reason: string, duration: number) => void;
  user: User | null;
}

export function BanUserForm({ isOpen, onOpenChange, onSave, user }: BanUserFormProps) {
  const form = useForm<BanFormValues>({
    resolver: zodResolver(banSchema),
    defaultValues: {
      banReason: '',
      banDuration: 7,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset({ banReason: '', banDuration: 7 });
    }
  }, [isOpen, form]);

  const onSubmit = (data: BanFormValues) => {
    if (user) {
      onSave(user.id, data.banReason, data.banDuration);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ban className="h-5 w-5 text-destructive" />
            Ban User: {user.name}
          </DialogTitle>
          <DialogDescription>
            Specify the reason and duration for the ban. A notification will be sent to the user.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
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
