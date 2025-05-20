
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockTeamPerformance } from "@/lib/mock-data";
import { BarChart as LucideBarChartIcon, Shuffle, Percent } from "lucide-react";
import type { ChartConfig } from "@/components/ui/chart";
import { TeamPerformanceChart } from "@/components/charts/team-performance-chart"; // New client component

const chartConfig = {
  xg: { label: "xG", color: "hsl(var(--chart-1))" },
  shots: { label: "Shots", color: "hsl(var(--chart-2))" },
  possession: { label: "Possession", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export default function DashboardPage() {
  const chartData = mockTeamPerformance.slice(0, 4).map(team => ({
    name: team.teamName.split(" ")[0], // Short name for chart label
    xg: team.xg,
    shots: team.shots,
    possession: team.possession,
  }));

  return (
    <>
      <AppHeader title="Team Performance Dashboard" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mockTeamPerformance.slice(0,4).map((team) => (
            <Card key={team.teamId} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{team.teamName}</CardTitle>
                <LucideBarChartIcon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{team.xg.toFixed(2)} xG</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {team.shots} shots, {team.shotsOnTarget} on target
                </p>
                <div className="flex items-center text-sm mt-2">
                  <Shuffle className="h-4 w-4 mr-1 text-accent" />
                  Pass Comp: {team.passCompletionRate.toFixed(1)}%
                </div>
                <div className="flex items-center text-sm mt-1">
                   <Percent className="h-4 w-4 mr-1 text-accent" />
                   Possession: {team.possession.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Team Comparison (xG, Shots, Possession)</CardTitle>
            <CardDescription>Comparing key metrics for selected teams.</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[350px]">
              <TeamPerformanceChart chartData={chartData} chartConfig={chartConfig} />
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
