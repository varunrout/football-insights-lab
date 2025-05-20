'use server';

/**
 * @fileOverview Provides suggested search queries for player and team statistics using GenAI.
 *
 * - suggestQueries - A function that suggests search queries.
 * - SuggestQueriesInput - The input type for the suggestQueries function.
 * - SuggestQueriesOutput - The return type for the suggestQueries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestQueriesInputSchema = z.object({
  searchTerm: z.string().describe('The search term provided by the user.'),
});
export type SuggestQueriesInput = z.infer<typeof SuggestQueriesInputSchema>;

const SuggestQueriesOutputSchema = z.object({
  queries: z.array(z.string()).describe('An array of suggested search queries.'),
});
export type SuggestQueriesOutput = z.infer<typeof SuggestQueriesOutputSchema>;

export async function suggestQueries(input: SuggestQueriesInput): Promise<SuggestQueriesOutput> {
  return suggestQueriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestQueriesPrompt',
  input: {schema: SuggestQueriesInputSchema},
  output: {schema: SuggestQueriesOutputSchema},
  prompt: `You are an expert sports data analyst. Generate search queries based on the given search term to efficiently find relevant insights.

Search Term: {{{searchTerm}}}

Suggested Queries:`,
});

const suggestQueriesFlow = ai.defineFlow(
  {
    name: 'suggestQueriesFlow',
    inputSchema: SuggestQueriesInputSchema,
    outputSchema: SuggestQueriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
