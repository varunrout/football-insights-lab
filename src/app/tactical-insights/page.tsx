
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TacticalInsightsPage() {
  const subPages = [
    { href: "/tactical-insights/offensive-phase", title: "Offensive Phase" },
    { href: "/tactical-insights/defensive-phase", title: "Defensive Phase" },
    { href: "/tactical-insights/build-up-phase", title: "Build-Up Phase" },
    { href: "/tactical-insights/turnover-phase", title: "Turnover Phase (Transitions)" },
    { href: "/tactical-insights/set-pieces", title: "Set Pieces" },
  ];

  return (
    <>
      <AppHeader title="Tactical Insights" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Tactical Insights Overview</CardTitle>
            <CardDescription>
              Select a phase of play to dive deeper into tactical analysis for a selected team.
              This section will allow selection of a team, match, or period for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subPages.map((page) => (
              <Card key={page.href} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline">
                    <Link href={page.href}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
