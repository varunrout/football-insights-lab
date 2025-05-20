
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PositionalAnalysisPage() {
  const subPages = [
    { href: "/positional-analysis/role-analysis", title: "Role Analysis" },
    { href: "/positional-analysis/zone-analysis", title: "Zone Analysis" },
  ];

  return (
    <>
      <AppHeader title="Positional Analysis" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Positional Analysis Overview</CardTitle>
            <CardDescription>
              Analyze player and team behavior based on positions and zones on the pitch.
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
