'use client';

import { useState } from 'react';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { suggestCompetition, type SuggestCompetitionOutput } from '@/ai/flows/smart-competition-suggestion';

export function SmartSuggestion() {
  const [suggestion, setSuggestion] = useState<SuggestCompetitionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const getSuggestion = async () => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestCompetition({
        playerSkillLevel: 'intermediate',
        pastParticipations: 'Played 5 "Find the Difference" games, won 2. Played 3 quiz games, average score.'
      });
      setSuggestion(result);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Failed to get suggestion:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch an AI suggestion. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-lg bg-card p-4 text-center">
        <Lightbulb className="mx-auto h-12 w-12 text-amber-400" />
        <h3 className="mt-2 text-lg font-semibold">Feeling Lucky?</h3>
        <p className="mt-1 text-sm text-muted-foreground">Let our AI find the perfect competition for you.</p>
        <Button onClick={getSuggestion} disabled={isLoading} className="mt-4 btn-gradient">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </>
          ) : (
            'Suggest a Game'
          )}
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-400" />
              AI Suggestion
            </DialogTitle>
            <DialogDescription>
              Based on your profile, here's a game you might enjoy.
            </DialogDescription>
          </DialogHeader>
          {suggestion && (
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <h4 className="font-semibold">Suggested Competition:</h4>
                <p className="rounded-md bg-secondary p-3 text-secondary-foreground">{suggestion.suggestedCompetition}</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold">Reasoning:</h4>
                <p className="rounded-md bg-secondary p-3 text-secondary-foreground">{suggestion.reasoning}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">Close</Button>
            <Button onClick={() => setIsDialogOpen(false)} className="btn-gradient">Let's Go!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
