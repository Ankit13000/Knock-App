'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Competition } from '@/lib/types';

const competitionSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  gameType: z.enum(['Find the Difference', 'Quiz', 'Puzzle']),
  entryFee: z.coerce.number().min(0, 'Entry fee cannot be negative.'),
  prize: z.coerce.number().min(0, 'Prize cannot be negative.'),
  totalSpots: z.coerce.number().int().min(2, 'Must have at least 2 spots.'),
  startTime: z.string().min(1, 'Start time is required.'),
  image: z.string().url('Must be a valid URL.'),
  imageHint: z.string().min(1, 'Image hint is required.').max(40, 'Hint is too long.'),
  status: z.enum(['Live', 'Upcoming', 'Results']),
});

type CompetitionFormValues = z.infer<typeof competitionSchema>;

interface CompetitionFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (competition: Competition) => void;
  competition: Competition | null;
}

export function CompetitionForm({ isOpen, onOpenChange, onSave, competition }: CompetitionFormProps) {
  const form = useForm<CompetitionFormValues>({
    resolver: zodResolver(competitionSchema),
    defaultValues: {
      title: '',
      gameType: 'Find the Difference',
      entryFee: 0,
      prize: 0,
      totalSpots: 10,
      startTime: '',
      image: 'https://placehold.co/600x400.png',
      imageHint: 'game competition',
      status: 'Upcoming',
    },
  });

  useEffect(() => {
    if (competition) {
      form.reset(competition);
    } else {
      form.reset({
        title: '',
        gameType: 'Find the Difference',
        entryFee: 0,
        prize: 0,
        totalSpots: 10,
        startTime: '',
        image: 'https://placehold.co/600x400.png',
        imageHint: 'game competition',
        status: 'Upcoming',
      });
    }
  }, [competition, form, isOpen]);

  const onSubmit = (data: CompetitionFormValues) => {
    const competitionData: Competition = {
      ...data,
      id: competition?.id || new Date().toISOString(),
      participants: competition?.participants || 0,
      timeLeft: competition?.timeLeft || 'New',
    };
    onSave(competitionData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{competition ? 'Edit Competition' : 'Create New Competition'}</DialogTitle>
          <DialogDescription>
            Fill in the details for the competition. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jungle Jam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gameType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a game type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Find the Difference">Find the Difference</SelectItem>
                        <SelectItem value="Quiz">Quiz</SelectItem>
                        <SelectItem value="Puzzle">Puzzle</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Upcoming">Upcoming</SelectItem>
                        <SelectItem value="Live">Live</SelectItem>
                        <SelectItem value="Results">Results</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="entryFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entry Fee (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prize (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalSpots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Spots</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Today at 8:00 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/600x400.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image AI Hint</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., jungle animals" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Save Competition</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
