
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MatchUpAnalysisPage() {
  const subPages = [
    { href: "/match-up-analysis/opposition-analysis", title: "Opposition Analysis" },
    { href: "/match-up-analysis/benchmarks", title: "Benchmarks" },
  ];
  return (
    <>
      <AppHeader title="Match-Up Analysis" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Match-Up Analysis Overview</CardTitle>
            <CardDescription>
              Compare two teams or analyze a specific upcoming/past match. 
              A match selection feature (e.g., dropdown) will be implemented here.
            </CardDescription>
          </CardHeader>
           <CardContent className="grid gap-4 md:grid-cols-2">
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
