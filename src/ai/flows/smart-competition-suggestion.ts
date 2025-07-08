// src/ai/flows/smart-competition-suggestion.ts
'use server';

/**
 * @fileOverview AI-powered smart competition suggestion agent.
 *
 * - suggestCompetition - A function that suggests competitions based on user skill and history.
 * - SuggestCompetitionInput - The input type for the suggestCompetition function.
 * - SuggestCompetitionOutput - The return type for the suggestCompetition function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCompetitionInputSchema = z.object({
  playerSkillLevel: z
    .string()
    .describe('The skill level of the player (e.g., beginner, intermediate, advanced).'),
  pastParticipations: z
    .string()
    .describe(
      'A summary of the player\'s past participations, including game types and performance.'
    ),
});
export type SuggestCompetitionInput = z.infer<typeof SuggestCompetitionInputSchema>;

const SuggestCompetitionOutputSchema = z.object({
  suggestedCompetition: z.string().describe('A suggestion for a relevant and engaging competition.'),
  reasoning: z.string().describe('The reasoning behind the competition suggestion.'),
});
export type SuggestCompetitionOutput = z.infer<typeof SuggestCompetitionOutputSchema>;

export async function suggestCompetition(input: SuggestCompetitionInput): Promise<SuggestCompetitionOutput> {
  return suggestCompetitionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCompetitionPrompt',
  input: {schema: SuggestCompetitionInputSchema},
  output: {schema: SuggestCompetitionOutputSchema},
  prompt: `You are an AI assistant that suggests relevant and engaging competitions to players based on their skill level and past participation.

  Skill Level: {{{playerSkillLevel}}}
  Past Participations: {{{pastParticipations}}}

  Based on this information, suggest a competition that would be a good fit for the player. Explain your reasoning.
  Be very concise.
  `,
});

const suggestCompetitionFlow = ai.defineFlow(
  {
    name: 'suggestCompetitionFlow',
    inputSchema: SuggestCompetitionInputSchema,
    outputSchema: SuggestCompetitionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
