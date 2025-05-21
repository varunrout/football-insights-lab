
"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Player, Team, Game, ShotEvent } from "@/lib/mock-data"; // Type imports
import { getTeams, getPlayers, getGames, getShotEvents } from "@/lib/data-service";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function OffensivePhasePage() {
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined);
  const [selectedPlayer, setSelectedPlayer] = useState<string | undefined>(undefined);
  const [selectedGame, setSelectedGame] = useState<string | undefined>(undefined);

  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [shots, setShots] = useState<ShotEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOffensivePhaseData() {
      setLoading(true);
      setError(null);
      try {
        const [teamsData, playersData, gamesData, shotEventsData] = await Promise.all([
          getTeams(),
          getPlayers(),
          getGames(),
          getShotEvents()
        ]);
        setTeams(teamsData);
        setPlayers(playersData);
        setGames(gamesData);
        setShots(shotEventsData);
      } catch (e) {
        setError((e as Error).message || "Failed to load data for offensive phase analysis. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadOffensivePhaseData();
  }, []);

  const filteredPlayers = useMemo(() => {
    if (!selectedTeam) return players;
    return players.filter(p => p.teamId === parseInt(selectedTeam));
  }, [selectedTeam, players]);

  const filteredShots = useMemo(() => {
    return shots.filter(shot => {
      const teamMatch = selectedTeam ? shot.teamId === parseInt(selectedTeam) : true;
      const playerMatch = selectedPlayer ? shot.playerId === parseInt(selectedPlayer) : true;
      const gameMatch = selectedGame ? shot.gameId === parseInt(selectedGame) : true;
      return teamMatch && playerMatch && gameMatch;
    });
  }, [selectedTeam, selectedPlayer, selectedGame, shots]);
  
  const clearFilters = () => {
    setSelectedTeam(undefined);
    setSelectedPlayer(undefined);
    setSelectedGame(undefined);
  };

  // Placeholder data for Top Chance Creators table
  const topChanceCreatorsData = [
    { playerName: "Kevin De Bruyne", teamName: "Manchester City", keyPasses: 90, keyPassesP90: 3.5, xA: 12.5, xAP90: 0.48, actualAssists: 14 },
    { playerName: "Lionel Messi", teamName: "Paris Saint-Germain", keyPasses: 85, keyPassesP90: 3.2, xA: 11.8, xAP90: 0.45, actualAssists: 12 },
    { playerName: "Bruno Fernandes", teamName: "Manchester United", keyPasses: 80, keyPassesP90: 3.0, xA: 10.2, xAP90: 0.40, actualAssists: 10 },
  ];

  if (loading) {
    return (
      <>
        <AppHeader title="Tactical Insights: Offensive Phase" />
        <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
          <Card className="shadow-lg w-full max-w-md">
            <CardHeader className="text-center">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <CardTitle className="mt-4">Loading Offensive Phase Data...</CardTitle>
              <CardDescription>Hang tight, we're fetching the details.</CardDescription>
            </CardHeader>
          </Card>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AppHeader title="Tactical Insights: Offensive Phase" />
        <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
          <Card className="shadow-lg w-full max-w-md border-destructive/50">
            <CardHeader className="text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
              <CardTitle className="mt-4 text-destructive">Error Loading Data</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => window.location.reload()} className="w-full">
                    Reload Page
                </Button>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <AppHeader title="Tactical Insights: Offensive Phase" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Shot Map Filters</CardTitle>
             <CardDescription>
               Filter shots by team, player, or game. {process.env.NEXT_PUBLIC_APP_ENV === 'TEST' ? 'Using mock data.' : 'Fetching live data.'}
             </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="team-filter">Team</Label>
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger id="team-filter">
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map(team => (
                    <SelectItem key={team.id} value={team.id.toString()}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="player-filter">Player</Label>
              <Select value={selectedPlayer} onValueChange={setSelectedPlayer} disabled={!selectedTeam && players.length > 0 && filteredPlayers.length === players.length && !selectedTeam}>
                <SelectTrigger id="player-filter">
                  <SelectValue placeholder="Select Player" />
                </SelectTrigger>
                <SelectContent>
                  {filteredPlayers.map(player => (
                    <SelectItem key={player.id} value={player.id.toString()}>
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="game-filter">Game</Label>
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger id="game-filter">
                  <SelectValue placeholder="Select Game" />
                </SelectTrigger>
                <SelectContent>
                  {games.map(game => (
                    <SelectItem key={game.id} value={game.id.toString()}>
                      {game.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="md:col-span-3 flex justify-end">
              <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Integrated Offensive Shot Map</CardTitle>
            <CardDescription>Visualizing shot locations, outcomes, and xG values for offensive actions. Filterable by play phase/player.</CardDescription>
          </CardHeader>
          <CardContent className="relative aspect-[7/5] w-full max-w-4xl mx-auto bg-green-700 rounded-md overflow-hidden border-4 border-white">
            <Image
              src="https://placehold.co/1050x750/228B22/FFFFFF.png?text=Football+Pitch"
              alt="Football pitch for shot map"
              layout="fill"
              objectFit="cover"
              data-ai-hint="football pitch"
            />
            {filteredShots.map(shot => (
              <div
                key={shot.id}
                className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full shadow-md"
                style={{
                  left: `${shot.x}%`,
                  top: `${shot.y}%`,
                  backgroundColor: shot.isGoal ? "hsl(var(--accent))" : "hsl(var(--primary))",
                  border: shot.isGoal ? "2px solid white" : "2px solid hsl(var(--primary-foreground))",
                  transform: "translate(-50%, -50%)",
                }}
                title={`Player: ${players.find(p=>p.id === shot.playerId)?.name}\nxG: ${shot.xg}\n${shot.isGoal ? "Goal!" : "Shot"}`}
              />
            ))}
             <div className="absolute bottom-2 right-2 p-2 bg-background/80 rounded-md text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: "hsl(var(--accent))", border: "1px solid white"}} />
                <span>Goal</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: "hsl(var(--primary))", border: "1px solid hsl(var(--primary-foreground))"}} />
                <span>Shot</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>xG vs Actual Goals Summary</CardTitle>
                <CardDescription>Bar chart or table comparing expected goals (xG) with actual goals scored for the selected team or period.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">A visual comparison (e.g., bar chart) will be implemented here to show xG vs Actual Goals.</p>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                   <Image src="https://placehold.co/600x338.png" alt="Placeholder for xG vs Actual Goals chart" width={600} height={338} data-ai-hint="bar chart goals" className="rounded-md" />
                </div>
            </CardContent>
        </Card>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Attacking Third Activity Heatmap</CardTitle>
                <CardDescription>Heatmap visualizing player touches or specific actions within the attacking third of the pitch.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">A heatmap showing areas of high activity in the attacking third will be displayed here.</p>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <Image src="https://placehold.co/600x338.png" alt="Placeholder for Attacking Third Heatmap" width={600} height={338} data-ai-hint="heatmap football pitch" className="rounded-md" />
                </div>
            </CardContent>
        </Card>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Final Third Pass Network</CardTitle>
                <CardDescription>Network visualization showing pass connections between players primarily operating in the final third.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">A pass network graph (nodes as players, edges as passes) for the final third will be implemented here.</p>
                 <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <Image src="https://placehold.co/600x338.png" alt="Placeholder for Pass Network" width={600} height={338} data-ai-hint="network graph connections" className="rounded-md" />
                </div>
            </CardContent>
        </Card>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Progressive Pass/Carry Maps</CardTitle>
                <CardDescription>Maps visualizing progressive passes and carries originating from different pitch zones, highlighting ball progression.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Maps showing the paths of progressive passes and carries will be displayed here.</p>
                 <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <Image src="https://placehold.co/600x338.png" alt="Placeholder for Progressive Actions Map" width={600} height={338} data-ai-hint="football pitch arrows" className="rounded-md" />
                </div>
            </CardContent>
        </Card>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Top Chance Creators</CardTitle>
                <CardDescription>Table ranking players by Key Passes and Expected Assists (xA), highlighting top playmakers.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Player Name</TableHead>
                            <TableHead>Team</TableHead>
                            <TableHead className="text-right">Key Passes</TableHead>
                            <TableHead className="text-right">KP P90</TableHead>
                            <TableHead className="text-right">xA</TableHead>
                            <TableHead className="text-right">xA P90</TableHead>
                            <TableHead className="text-right">Assists</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topChanceCreatorsData.map((player, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{player.playerName}</TableCell>
                            <TableCell>{player.teamName}</TableCell>
                            <TableCell className="text-right">{player.keyPasses}</TableCell>
                            <TableCell className="text-right">{player.keyPassesP90.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{player.xA.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{player.xAP90.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{player.actualAssists}</TableCell>
                        </TableRow>
                        ))}
                         {topChanceCreatorsData.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground">No chance creator data available.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

      </main>
    </>
  );
}

