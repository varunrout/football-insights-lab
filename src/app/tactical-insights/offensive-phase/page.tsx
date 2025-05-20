
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function OffensivePhasePage() {
  return (
    <>
      <AppHeader title="Tactical Insights: Offensive Phase" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Offensive Phase Analysis</CardTitle>
            <CardDescription>
              Analyzing team's attacking patterns, chance creation (xG), shot locations, effectiveness from open play and set-pieces, final third entries, and progressive actions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals and detailed analysis for the Offensive Phase will be implemented here. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Shot map (with xG values, color-coded by outcome).</li>
              <li>xG vs Actual Goals summary.</li>
              <li>Heatmap of touches/actions in the attacking third.</li>
              <li>Pass network visualization (final third).</li>
              <li>Progressive pass/carry maps.</li>
              <li>Table of top chance creators (Key Passes, xA).</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
