
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function OppositionAnalysisPage() {
  return (
    <>
      <AppHeader title="Match-Up Analysis: Opposition Analysis" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Opposition Analysis</CardTitle>
            <CardDescription>
              Analyzing the selected opponent's strengths, weaknesses, tactical setups, key players, and performance in different game phases.
              (This page will be active after a match is selected on the parent Match-Up Analysis page).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals and detailed analysis for Opposition Analysis will be implemented here. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Side-by-side comparison of team stats.</li>
              <li>Opponent's key formation display.</li>
              <li>Visuals from "Tactical Insights" for the opponent.</li>
              <li>Key player cards for the opposition.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
