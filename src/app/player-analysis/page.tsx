
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PlayerAnalysisPage() {
  const subPages = [
    { href: "/player-analysis/profile-overview", title: "Profile & Overview" },
    { href: "/player-analysis/performance-metrics", title: "Performance Metrics (P90)" },
    { href: "/player-analysis/heatmaps-action-zones", title: "Heatmaps & Action Zones" },
    { href: "/player-analysis/trend-analysis", title: "Trend Analysis" },
    { href: "/player-analysis/percentile-rankings", title: "Percentile Rankings" },
  ];

  return (
    <>
      <AppHeader title="Player Analysis" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Player Analysis Overview</CardTitle>
            <CardDescription>
              In-depth analysis of individual players. 
              A player selection feature (e.g., search or dropdown) will be implemented here.
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
