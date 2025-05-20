
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PlayerProfileOverviewPage() {
  return (
    <>
      <AppHeader title="Player Analysis: Profile & Overview" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Player Profile & Overview</CardTitle>
            <CardDescription>
              Biographical details, summary of KPIs, and contract information for the selected player.
              (This page will be active after a player is selected on the parent Player Analysis page).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals and detailed information for the Player Profile will be implemented here. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Player "card" with photo, basic info, and key stats.</li>
              <li>Small radar chart summarizing player style.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
