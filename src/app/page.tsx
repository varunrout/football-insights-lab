
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getTeamPerformance } from "@/lib/data-service"; // Updated import
import type { TeamPerformance } from "@/lib/mock-data"; // Type import
import { BarChart as LucideBarChartIcon, Shuffle, Percent, AlertTriangle } from "lucide-react";
import type { ChartConfig } from "@/components/ui/chart";
import { TeamPerformanceChart } from "@/components/charts/team-performance-chart"; 

const chartConfig = {
  xg: { label: "xG", color: "hsl(var(--chart-1))" },
  shots: { label: "Shots", color: "hsl(var(--chart-2))" },
  possession: { label: "Possession", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export default async function DashboardPage() {
  let teamPerformanceData: TeamPerformance[] = [];
  let error: string | null = null;
  let isLoading = true; // For Server Components, loading is effectively before render or handled by Suspense

  try {
    teamPerformanceData = await getTeamPerformance();
    isLoading = false;
  } catch (e) {
    error = (e as Error).message || "Failed to load team performance data.";
    isLoading = false;
    // Optionally, use mock data as a fallback on error
    // import { mockTeamPerformance } from "@/lib/mock-data";
    // teamPerformanceData = mockTeamPerformance; 
    // error = `${error} Displaying fallback data.`;
  }

  const chartData = teamPerformanceData.slice(0, 4).map(team => ({
    name: team.teamName.split(" ")[0], // Short name for chart label
    xg: team.xg,
    shots: team.shots,
    possession: team.possession,
  }));

  // Server components render once; "loading" is implicit unless using Suspense.
  // This simple error display is for catastrophic failures.
  if (error && teamPerformanceData.length === 0) {
    return (
      <>
        <AppHeader title="Team Performance Dashboard" />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Card className="shadow-lg border-destructive/50">
            <CardHeader className="flex flex-row items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <CardTitle className="text-destructive">Error Loading Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
              <p className="mt-2 text-sm text-muted-foreground">Please try refreshing the page or contact support if the issue persists.</p>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }
  
  return (
    <>
      <AppHeader title="Team Performance Dashboard" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        {teamPerformanceData.length === 0 && !error && ( // Case where API returns empty but no error
            <Card>
                <CardHeader><CardTitle>No Data Available</CardTitle></CardHeader>
                <CardContent><p>Team performance data could not be retrieved or is empty.</p></CardContent>
            </Card>
        )}
        {teamPerformanceData.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {teamPerformanceData.slice(0,4).map((team) => (
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
        )}

        {chartData.length > 0 && (
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
        )}
         {error && teamPerformanceData.length > 0 && ( // Display non-critical error if data (possibly fallback) is shown
          <Card className="shadow-lg border-destructive/30 mt-4">
            <CardHeader className="flex flex-row items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-destructive text-lg">Data Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
