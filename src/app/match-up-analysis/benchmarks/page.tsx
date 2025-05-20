
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function BenchmarksPage() {
  return (
    <>
      <AppHeader title="Match-Up Analysis: Benchmarks" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Benchmarks</CardTitle>
            <CardDescription>
              Comparing team performance in a chosen match against their season averages, league averages, or top performers.
              (This page will be active after a match is selected on the parent Match-Up Analysis page).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visuals and detailed analysis for Benchmarks will be implemented here. This includes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Bar charts comparing match stats vs. season/league averages.</li>
              <li>Percentile ranking tables/visuals for key metrics.</li>
              <li>Deviation plots showing performance against average.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
