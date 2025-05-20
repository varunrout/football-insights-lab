
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PercentileRankingsPage() {
  return (
    <>
      <AppHeader title="Player Analysis: Percentile Rankings" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Percentile Rankings</CardTitle>
            <CardDescription>
              Showing how the player ranks against others in their primary position within the league for a wide range of metrics.
              (This page will be active after a player is selected).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals for Percentile Rankings will be implemented here. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Bar charts where each bar represents a metric, and length/color indicates percentile rank.</li>
              <li>Table format showing metric, value, and percentile.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
