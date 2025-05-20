"use server";

import { evaluateXt, type XtAnalyticsInput, type XtAnalyticsOutput } from "@/ai/flows/xt-analytics";

export async function handleXtEvaluation(input: XtAnalyticsInput): Promise<XtAnalyticsOutput | { error: string }> {
  try {
    const result = await evaluateXt(input);
    return result;
  } catch (e) {
    console.error("Error evaluating xT:", e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during xT evaluation.";
    return { error: errorMessage };
  }
}
