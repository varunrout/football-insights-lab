"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { mockTeams, mockPlayers, mockGames, mockShotEvents, Player, Team, Game, ShotEvent } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export default function ShotMapsPage() {
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined);
  const [selectedPlayer, setSelectedPlayer] = useState<string | undefined>(undefined);
  const [selectedGame, setSelectedGame] = useState<string | undefined>(undefined);

  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [shots, setShots] = useState<ShotEvent[]>([]);

  useEffect(() => {
    // Simulate data fetching
    setTeams(mockTeams);
    setPlayers(mockPlayers);
    setGames(mockGames);
    setShots(mockShotEvents);
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


  return (
    <>
      <AppHeader title="Interactive Shot Maps" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
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
              <Select value={selectedPlayer} onValueChange={setSelectedPlayer} disabled={!selectedTeam && players.length > 0 && filteredPlayers.length === players.length}>
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
            <CardTitle>Shot Map</CardTitle>
          </CardHeader>
          <CardContent className="relative aspect-[7/5] w-full max-w-4xl mx-auto bg-green-700 rounded-md overflow-hidden border-4 border-white">
            {/* Placeholder for football pitch */}
            <Image
              src="https://placehold.co/1050x750/228B22/FFFFFF.png?text=Football+Pitch"
              alt="Football pitch"
              layout="fill"
              objectFit="cover"
              data-ai-hint="football pitch"
            />
            {/* Draw shots */}
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
      </main>
    </>
  );
}
