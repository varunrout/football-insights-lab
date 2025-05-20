
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DefensivePhasePage() {
  return (
    <>
      <AppHeader title="Tactical Insights: Defensive Phase" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Defensive Phase Analysis</CardTitle>
            <CardDescription>
              Focus on team's defensive structure, pressing intensity (PPDA), ball recovery locations, duel success rates, and opposition chance prevention.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals and detailed analysis for the Defensive Phase will be implemented here. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Heatmap of defensive actions (interceptions, tackles, clearances).</li>
              <li>PPDA trend over matches or within a match.</li>
              <li>Map of ball recovery locations.</li>
              <li>Duel map (location and outcome).</li>
              <li>Charts showing xG conceded vs Actual Goals conceded.</li>
              <li>Pressure event map.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
