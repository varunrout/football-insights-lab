
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HeatmapsActionZonesPage() {
  return (
    <>
      <AppHeader title="Player Analysis: Heatmaps & Action Zones" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Heatmaps & Action Zones</CardTitle>
            <CardDescription>
              Visualizing where the player typically operates and locations of their key actions.
              (This page will be active after a player is selected).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals for Heatmaps & Action Zones will be implemented here. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Overall heatmap of player's touches.</li>
              <li>Action maps: pass origin/destination, shot locations, successful dribbles, defensive actions.</li>
              <li>Pass sonar/rose plot for the selected player.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
