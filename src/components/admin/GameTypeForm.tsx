'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { GameType } from '@/lib/types';

const gameTypeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
});

type GameTypeFormValues = z.infer<typeof gameTypeSchema>;

interface GameTypeFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (gameType: GameType) => void;
  gameType: GameType | null;
}

export function GameTypeForm({ isOpen, onOpenChange, onSave, gameType }: GameTypeFormProps) {
  const form = useForm<GameTypeFormValues>({
    resolver: zodResolver(gameTypeSchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (gameType) {
      form.reset({ name: gameType.name });
    } else {
      form.reset({ name: '' });
    }
  }, [gameType, form, isOpen]);

  const onSubmit = (data: GameTypeFormValues) => {
    const gameTypeData: GameType = {
      ...data,
      id: gameType?.id || new Date().toISOString(),
    };
    onSave(gameTypeData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{gameType ? 'Edit Game Type' : 'Create New Game Type'}</DialogTitle>
          <DialogDescription>
            Enter a name for the game type.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Memory Match" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save Game Type</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
