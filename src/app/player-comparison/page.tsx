
"use client";

import { useState, useEffect, useMemo } from "react";
import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Player, PlayerStats } from "@/lib/mock-data"; // Type imports
import { getPlayers, getPlayerStats as fetchAllPlayerStats } from "@/lib/data-service"; // Updated imports
import { ArrowUpDown, UserMinus, UserPlus, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type SortableColumn = keyof Pick<PlayerStats, "playerName" | "goals" | "assists" | "xg" | "xa" | "keyPasses" | "passCompletionRate">;

export default function PlayerComparisonPage() {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [allPlayerStats, setAllPlayerStats] = useState<PlayerStats[]>([]);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<number[]>([]);
  const [comparisonData, setComparisonData] = useState<PlayerStats[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortableColumn; direction: "ascending" | "descending" } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      setError(null);
      try {
        const [playersData, playerStatsData] = await Promise.all([
          getPlayers(),
          fetchAllPlayerStats()
        ]);
        
        setAllPlayers(playersData);
        setAllPlayerStats(playerStatsData);

        // Default to first one or two players if available
        const initialSelectedIds: number[] = [];
        if (playersData.length > 0) initialSelectedIds.push(playersData[0].id);
        if (playersData.length > 1) initialSelectedIds.push(playersData[1].id);
        setSelectedPlayerIds(initialSelectedIds);

      } catch (e) {
        setError((e as Error).message || "Failed to load player data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    const data = allPlayerStats.filter(stat => selectedPlayerIds.includes(stat.playerId));
    setComparisonData(data);
  }, [selectedPlayerIds, allPlayerStats]);

  const handleAddPlayerSlot = () => {
    if (selectedPlayerIds.length < 5) {
      const availablePlayer = allPlayers.find(p => !selectedPlayerIds.includes(p.id));
      if (availablePlayer) {
        setSelectedPlayerIds(prev => [...prev, availablePlayer.id]);
      }
    }
  };

  const handleRemovePlayerSlot = (indexToRemove: number) => {
    setSelectedPlayerIds(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handlePlayerSelect = (index: number, playerId: string) => {
    const newPlayerId = parseInt(playerId);
    if (selectedPlayerIds.some((id, i) => i !== index && id === newPlayerId)) {
      return;
    }
    setSelectedPlayerIds(prev => {
      const newSelection = [...prev];
      newSelection[index] = newPlayerId;
      return newSelection;
    });
  };
  
  const sortedData = useMemo(() => {
    let sortableItems = [...comparisonData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (typeof valA === 'number' && typeof valB === 'number') {
            if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        } else if (typeof valA === 'string' && typeof valB === 'string') {
            return sortConfig.direction === 'ascending' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return 0;
      });
    }
    return sortableItems;
  }, [comparisonData, sortConfig]);

  const requestSort = (key: SortableColumn) => {
    let direction: "ascending" | "descending" = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: SortableColumn) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return sortConfig.direction === 'ascending' ? '🔼' : '🔽';
  };

  const renderSortableHeader = (key: SortableColumn, label: string) => (
    <TableHead onClick={() => requestSort(key)} className="cursor-pointer hover:bg-muted/50">
      <div className="flex items-center">
        {label} {getSortIndicator(key)}
      </div>
    </TableHead>
  );

  if (loading) {
    return (
      <>
        <AppHeader title="Player Comparison" />
        <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
          <Card className="shadow-lg w-full max-w-md">
            <CardHeader className="text-center">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <CardTitle className="mt-4">Loading Player Data...</CardTitle>
              <CardDescription>Please wait while we fetch the necessary information.</CardDescription>
            </CardHeader>
          </Card>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AppHeader title="Player Comparison" />
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
      <AppHeader title="Player Comparison" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Select Players to Compare</CardTitle>
            <CardDescription>Choose up to 5 players. {process.env.NEXT_PUBLIC_APP_ENV === 'TEST' ? 'Using mock data.' : 'Fetching live data.'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedPlayerIds.map((selectedId, index) => (
              <div key={index} className="flex items-center gap-2">
                <Select
                  value={selectedId?.toString()}
                  onValueChange={(value) => handlePlayerSelect(index, value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder={`Select Player ${index + 1}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Players</SelectLabel>
                      {allPlayers.map(player => (
                        <SelectItem 
                          key={player.id} 
                          value={player.id.toString()}
                          disabled={selectedPlayerIds.some((id, i) => i !== index && id === player.id)}
                        >
                          {player.name} ({allPlayerStats.find(s => s.playerId === player.id)?.teamName || 'N/A'})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {selectedPlayerIds.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => handleRemovePlayerSlot(index)} aria-label="Remove player slot">
                    <UserMinus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {selectedPlayerIds.length < 5 && allPlayers.length > selectedPlayerIds.length && (
              <Button onClick={handleAddPlayerSlot} variant="outline" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" /> Add Player Slot
              </Button>
            )}
          </CardContent>
        </Card>

        {sortedData.length > 0 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Comparison Table</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    {renderSortableHeader("playerName", "Player")}
                    <TableHead>Team</TableHead>
                    <TableHead>MP</TableHead>
                    {renderSortableHeader("goals", "Goals")}
                    {renderSortableHeader("assists", "Assists")}
                    {renderSortableHeader("xg", "xG")}
                    {renderSortableHeader("xa", "xA")}
                    {renderSortableHeader("keyPasses", "Key Passes")}
                    {renderSortableHeader("passCompletionRate", "Pass %")}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.map((stats) => (
                    <TableRow key={stats.playerId}>
                      <TableCell className="font-medium">{stats.playerName}</TableCell>
                      <TableCell>{stats.teamName}</TableCell>
                      <TableCell>{stats.matchesPlayed}</TableCell>
                      <TableCell>{stats.goals}</TableCell>
                      <TableCell>{stats.assists}</TableCell>
                      <TableCell>{stats.xg.toFixed(2)}</TableCell>
                      <TableCell>{stats.xa.toFixed(2)}</TableCell>
                      <TableCell>{stats.keyPasses}</TableCell>
                      <TableCell>{stats.passCompletionRate.toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
