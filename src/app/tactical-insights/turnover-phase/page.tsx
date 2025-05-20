
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TurnoverPhasePage() {
  return (
    <>
      <AppHeader title="Tactical Insights: Turnover Phase (Transitions)" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Turnover Phase (Transitions) Analysis</CardTitle>
            <CardDescription>
              Analyzing actions immediately following a gain (offensive transition/counter-attack) or loss of possession (defensive transition/counter-pressing).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals and detailed analysis for the Turnover Phase will be implemented here. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Maps of possession gains leading to shots.</li>
              <li>Maps of possession losses and subsequent opposition actions.</li>
              <li>Bar chart: Time to shot after recovery / Time to regain possession after loss.</li>
              <li>Success rate of counter-presses.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
