'use server';

/**
 * @fileOverview xT (Expected Threat) evaluation flow.
 *
 * - evaluateXt - A function that evaluates the xT of player actions.
 * - XtAnalyticsInput - The input type for the evaluateXt function.
 * - XtAnalyticsOutput - The return type for the evaluateXt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const XtAnalyticsInputSchema = z.object({
  playerAction: z.string().describe('Description of the player action (pass or dribble), including player position and play data.'),
});
export type XtAnalyticsInput = z.infer<typeof XtAnalyticsInputSchema>;

const XtAnalyticsOutputSchema = z.object({
  expectedThreat: z.number().describe('The probability that the possession results in a goal, expressed as a number between 0 and 1.'),
  impactAssessment: z.string().describe('A detailed assessment of the impact of the player action on the game.'),
});
export type XtAnalyticsOutput = z.infer<typeof XtAnalyticsOutputSchema>;

export async function evaluateXt(input: XtAnalyticsInput): Promise<XtAnalyticsOutput> {
  return evaluateXtFlow(input);
}

const prompt = ai.definePrompt({
  name: 'xtAnalyticsPrompt',
  input: {schema: XtAnalyticsInputSchema},
  output: {schema: XtAnalyticsOutputSchema},
  prompt: `You are an expert football analyst specializing in xT (Expected Threat) evaluation.

You will use the player action data to determine the probability that the possession results in a goal.

Consider the player's position, the type of play (pass or dribble), and any other relevant game data.

Player Action: {{{playerAction}}}

Based on this information, provide an expected threat score between 0 and 1, and a detailed assessment of the impact of the player action on the game.
`,
});

const evaluateXtFlow = ai.defineFlow(
  {
    name: 'evaluateXtFlow',
    inputSchema: XtAnalyticsInputSchema,
    outputSchema: XtAnalyticsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
