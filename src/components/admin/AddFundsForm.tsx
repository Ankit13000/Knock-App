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
import { DollarSign } from 'lucide-react';

const addFundsSchema = z.object({
  amount: z.coerce.number().positive('Amount must be positive.'),
});

type AddFundsFormValues = z.infer<typeof addFundsSchema>;

interface AddFundsFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (userId: string, amount: number) => void;
  user: User | null;
}

export function AddFundsForm({ isOpen, onOpenChange, onSave, user }: AddFundsFormProps) {
  const form = useForm<AddFundsFormValues>({
    resolver: zodResolver(addFundsSchema),
    defaultValues: {
      amount: 0,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset({ amount: 0 });
    }
  }, [isOpen, form]);

  const onSubmit = (data: AddFundsFormValues) => {
    if (!user) return;
    onSave(user.id, data.amount);
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-positive" />
            Add Funds to Wallet
          </DialogTitle>
          <DialogDescription>
            Manually add funds to {user.name}'s wallet. This will create a 'Deposit' transaction record.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Add Funds</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
