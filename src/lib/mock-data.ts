export interface Player {
  id: number;
  name: string;
  teamId: number;
}

export interface Team {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  name: string; // e.g., "Team A vs Team B"
  date: string;
}

export interface ShotEvent {
  id: number;
  playerId: number;
  teamId: number;
  gameId: number;
  x: number; // 0-100
  y: number; // 0-100
  isGoal: boolean;
  xg: number; // Expected Goals
}

export interface TeamPerformance {
  teamId: number;
  teamName: string;
  xg: number;
  shots: number;
  shotsOnTarget: number;
  passCompletionRate: number; // percentage
  possession: number; // percentage
}

export interface PlayerStats {
  playerId: number;
  playerName: string;
  teamName: string;
  matchesPlayed: number;
  goals: number;
  assists: number;
  xg: number;
  xa: number; // Expected Assists
  keyPasses: number;
  passCompletionRate: number;
}

export const mockTeams: Team[] = [
  { id: 1, name: "Red Dragons FC" },
  { id: 2, name: "Blue Lions SC" },
  { id: 3, name: "Green Griffins" },
  { id: 4, name: "Yellow Phoenixes" },
];

export const mockPlayers: Player[] = [
  { id: 101, name: "Alex Hunter", teamId: 1 },
  { id: 102, name: "Ben Carter", teamId: 1 },
  { id: 103, name: "Charlie Duke", teamId: 1 },
  { id: 201, name: "David Miller", teamId: 2 },
  { id: 202, name: "Eva Rostova", teamId: 2 },
  { id: 301, name: "Frank Stone", teamId: 3 },
  { id: 401, name: "Grace Lee", teamId: 4 },
];

export const mockGames: Game[] = [
  { id: 1001, name: "Red Dragons FC vs Blue Lions SC", date: "2024-08-10" },
  { id: 1002, name: "Green Griffins vs Yellow Phoenixes", date: "2024-08-11" },
  { id: 1003, name: "Red Dragons FC vs Green Griffins", date: "2024-08-17" },
];

export const mockShotEvents: ShotEvent[] = [
  { id: 1, playerId: 101, teamId: 1, gameId: 1001, x: 85, y: 50, isGoal: true, xg: 0.35 },
  { id: 2, playerId: 101, teamId: 1, gameId: 1001, x: 70, y: 40, isGoal: false, xg: 0.12 },
  { id: 3, playerId: 201, teamId: 2, gameId: 1001, x: 90, y: 60, isGoal: false, xg: 0.40 },
  { id: 4, playerId: 202, teamId: 2, gameId: 1001, x: 75, y: 55, isGoal: true, xg: 0.22 },
  { id: 5, playerId: 102, teamId: 1, gameId: 1003, x: 60, y: 30, isGoal: false, xg: 0.05 },
  { id: 6, playerId: 301, teamId: 3, gameId: 1002, x: 88, y: 45, isGoal: true, xg: 0.30 },
];

export const mockTeamPerformance: TeamPerformance[] = mockTeams.map(team => ({
  teamId: team.id,
  teamName: team.name,
  xg: parseFloat((Math.random() * 3 + 0.5).toFixed(2)),
  shots: Math.floor(Math.random() * 20 + 5),
  shotsOnTarget: Math.floor(Math.random() * 10 + 2),
  passCompletionRate: parseFloat((Math.random() * 30 + 60).toFixed(1)),
  possession: parseFloat((Math.random() * 40 + 30).toFixed(1)),
}));


export const mockPlayerStats: PlayerStats[] = mockPlayers.map(player => {
  const team = mockTeams.find(t => t.id === player.teamId);
  return {
    playerId: player.id,
    playerName: player.name,
    teamName: team ? team.name : "Unknown Team",
    matchesPlayed: Math.floor(Math.random() * 10 + 5),
    goals: Math.floor(Math.random() * 5),
    assists: Math.floor(Math.random() * 5),
    xg: parseFloat((Math.random() * 2 + 0.1).toFixed(2)),
    xa: parseFloat((Math.random() * 2 + 0.1).toFixed(2)),
    keyPasses: Math.floor(Math.random() * 10 + 2),
    passCompletionRate: parseFloat((Math.random() * 30 + 65).toFixed(1)),
  };
});

// Function to get a subset of players for comparison tool
export const getPlayersForComparison = (playerIds: number[]): PlayerStats[] => {
  return mockPlayerStats.filter(p => playerIds.includes(p.playerId));
};

// Function to get shots for a specific filter criteria
export const getFilteredShots = (filters: { teamId?: number; playerId?: number; gameId?: number }): ShotEvent[] => {
  return mockShotEvents.filter(shot => {
    const teamMatch = filters.teamId ? shot.teamId === filters.teamId : true;
    const playerMatch = filters.playerId ? shot.playerId === filters.playerId : true;
    const gameMatch = filters.gameId ? shot.gameId === filters.gameId : true;
    return teamMatch && playerMatch && gameMatch;
  });
};

export const getTeamPerformanceById = (teamId: number): TeamPerformance | undefined => {
  return mockTeamPerformance.find(tp => tp.teamId === teamId);
}
