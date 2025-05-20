
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PerformanceMetricsPage() {
  return (
    <>
      <AppHeader title="Player Analysis: Performance Metrics (P90)" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics (Per 90)</CardTitle>
            <CardDescription>
              Detailed offensive, defensive, passing, and goalkeeping metrics, normalized per 90 minutes. Comparison to positional averages.
              (This page will be active after a player is selected).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals and detailed stats for Performance Metrics will be implemented here. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Tables of detailed P90 stats.</li>
              <li>Bar charts comparing player's P90 stats to league/positional averages.</li>
              <li>Radar chart showing a wider array of P90 metrics.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
