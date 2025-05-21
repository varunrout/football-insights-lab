
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
      // Additional filter for offensive phase, e.g., playPattern - assuming all shots are relevant for now
      // const playPhaseMatch = shot.playPattern === "Open Play" || shot.playPattern === "Fast Break"; 
      return teamMatch && playerMatch && gameMatch;
    });
  }, [selectedTeam, selectedPlayer, selectedGame, shots]);
  
  const clearFilters = () => {
    setSelectedTeam(undefined);
    setSelectedPlayer(undefined);
    setSelectedGame(undefined);
  };

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
            <CardTitle>Offensive Shot Map</CardTitle>
            <CardDescription>Visualizing shot locations, outcomes, and xG values for offensive actions.</CardDescription>
          </CardHeader>
          <CardContent className="relative aspect-[7/5] w-full max-w-4xl mx-auto bg-green-700 rounded-md overflow-hidden border-4 border-white">
            <Image
              src="https://placehold.co/1050x750/228B22/FFFFFF.png?text=Football+Pitch"
              alt="Football pitch"
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
                <CardTitle>Other Offensive Phase Visuals</CardTitle>
                <CardDescription>Placeholders for xG vs Actual Goals, Heatmaps, Pass Networks, etc.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Further offensive phase analytics will be displayed here, including:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>xG (Expected Goals) vs Actual Goals summary (bar chart or table).</li>
                  <li>Heatmap of touches/actions in the attacking third.</li>
                  <li>Pass network visualization focused on the final third (nodes as players, edges as passes, sized by volume).</li>
                  <li>Progressive pass/carry maps originating from different pitch zones.</li>
                  <li>Table of top chance creators (Key Passes, xA - Expected Assists).</li>
                </ul>
            </CardContent>
        </Card>
      </main>
    </>
  );
}
