"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, WandSparkles } from "lucide-react";
import type { XtAnalyticsOutput } from "@/ai/flows/xt-analytics";
import { handleXtEvaluation } from "./actions"; // Server Action
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  playerPosition: z.string().min(5, {
    message: "Player position must be at least 5 characters.",
  }).max(100, { message: "Player position must be at most 100 characters."}),
  playData: z.string().min(10, {
    message: "Play data must be at least 10 characters.",
  }).max(500, { message: "Play data must be at most 500 characters."}),
});

type XtFormValues = z.infer<typeof formSchema>;

export default function XtAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [xtResult, setXtResult] = useState<XtAnalyticsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<XtFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerPosition: "",
      playData: "",
    },
  });

  async function onSubmit(values: XtFormValues) {
    setIsLoading(true);
    setXtResult(null);
    
    const input = { playerAction: `Position: ${values.playerPosition}. Play: ${values.playData}` };
    const result = await handleXtEvaluation(input);

    if ("error" in result) {
        toast({
            title: "Error Evaluating xT",
            description: result.error,
            variant: "destructive",
        });
    } else {
        setXtResult(result);
        toast({
            title: "xT Evaluation Successful",
            description: "The expected threat has been calculated.",
        });
    }
    setIsLoading(false);
  }

  return (
    <>
      <AppHeader title="xT Analytics" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>Evaluate Expected Threat (xT)</CardTitle>
            <CardDescription>
              Enter player position and play data to calculate the probability of the possession resulting in a goal.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="playerPosition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Player Position</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Attacking third, right wing" {...field} />
                      </FormControl>
                      <FormDescription>
                        Describe the player's location on the pitch.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="playData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Play Data (Pass or Dribble)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Received pass at edge of box, dribbled past one defender towards goal."
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Detail the specific action taken by the player.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <WandSparkles className="mr-2 h-4 w-4" />
                  )}
                  Evaluate xT
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {xtResult && (
          <Card className="max-w-2xl mx-auto shadow-lg mt-6 animate-in fade-in-50 duration-500">
            <CardHeader>
              <CardTitle>xT Evaluation Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Expected Threat (xT)</h3>
                <p className="text-2xl font-bold text-primary">
                  {(xtResult.expectedThreat * 100).toFixed(2)}%
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Impact Assessment</h3>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {xtResult.impactAssessment}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
