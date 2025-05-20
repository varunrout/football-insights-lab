
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
              Analyzing team's attacking patterns, chance creation (xG), final third entries, and effectiveness from open play and set-pieces. This section features an integrated Shot Map as a key visual.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals and detailed analysis for the Offensive Phase will be implemented here. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li><strong>Integrated Shot Map:</strong> Displaying shots with xG values, color-coded by outcome, and filterable by play phase/player. (Functionality to be moved from former standalone Shot Maps page).</li>
              <li>xG (Expected Goals) vs Actual Goals summary (bar chart or table).</li>
              <li>Heatmap of touches/actions in the attacking third.</li>
              <li>Pass network visualization focused on the final third (nodes as players, edges as passes, sized by volume).</li>
              <li>Progressive pass/carry maps originating from different pitch zones.</li>
              <li>Table of top chance creators (Key Passes, xA - Expected Assists).</li>
            </ul>
            <p className="mt-4 text-sm">
              The actual implementation of the interactive shot map and other visuals will require data integration and charting components. The existing code from <code>/src/app/shot-maps/page.tsx</code> can be refactored into a reusable component for this page.
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
