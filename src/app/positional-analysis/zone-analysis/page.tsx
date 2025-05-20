
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ZoneAnalysisPage() {
  return (
    <>
      <AppHeader title="Positional Analysis: Zone Analysis" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Zone Analysis</CardTitle>
            <CardDescription>
              Analyzing team activity, effectiveness, and control within specific pitch zones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals and detailed analysis for Zone Analysis will be implemented here. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Pitch divided into zones with overlaid statistics.</li>
              <li>Heatmaps of ball circulation between zones.</li>
              <li>Comparative bar charts showing activity/effectiveness across zones.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
