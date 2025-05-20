
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function BuildUpPhasePage() {
  return (
    <>
      <AppHeader title="Tactical Insights: Build-Up Phase" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Build-Up Phase Analysis</CardTitle>
            <CardDescription>
              Analyzing how the team progresses the ball from their defensive third, common build-up patterns, and player involvement in initiating attacks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals and detailed analysis for the Build-Up Phase will be implemented here. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Pass networks originating from the defensive third.</li>
              <li>Progressive pass maps by player.</li>
              <li>"Pass sonars" or rose plots for key build-up players.</li>
              <li>Heatmaps of player involvement during build-up.</li>
              <li>Table of players with most progressive passes/carries.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
