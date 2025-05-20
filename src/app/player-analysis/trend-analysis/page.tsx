
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TrendAnalysisPage() {
  return (
    <>
      <AppHeader title="Player Analysis: Trend Analysis" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Trend Analysis</CardTitle>
            <CardDescription>
              Analyzing how the player's key metrics have changed over a selected period (e.g., last 5 games, season by month).
              (This page will be active after a player is selected).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals for Trend Analysis will be implemented here. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Line charts showing trends of key metrics over time.</li>
              <li>Rolling average plots.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
