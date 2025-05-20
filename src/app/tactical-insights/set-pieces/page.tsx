
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SetPiecesPage() {
  return (
    <>
      <AppHeader title="Tactical Insights: Set Pieces" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Set Pieces Analysis</CardTitle>
            <CardDescription>
              Analysis of offensive (corners, free-kicks) and defensive set pieces, including delivery zones, first contacts, shot generation, and goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals and detailed analysis for Set Pieces will be implemented here. This includes:</p>
            <p className="font-medium mt-2">Offensive:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-muted-foreground">
              <li>Shot map from corners/free-kicks.</li>
              <li>Heatmap of corner delivery locations.</li>
              <li>Network graph of corner taker to first contact/shooter.</li>
            </ul>
            <p className="font-medium mt-2">Defensive:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm text-muted-foreground">
              <li>Map of opposition shots conceded from set pieces.</li>
              <li>Heatmap of clearances from set pieces.</li>
              <li>First contact success rate in own box.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
