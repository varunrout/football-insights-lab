// src/lib/data-service.ts
import * as mockData from '@/lib/mock-data';
import type { Team, Player, Game, ShotEvent, PlayerStats, TeamPerformance } from '@/lib/mock-data';

const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;
// This base URL is for the Next.js internal API routes (e.g. /api/teams)
const NEXTJS_API_BASE_URL = '/api'; 

async function fetchDataFromNextJsApi<T>(endpoint: string, mockValue: T): Promise<T> {
  if (APP_ENV === 'TEST') {
    // console.log(`Using mock data for ${endpoint}`);
    // Simulate async behavior for consistency with API calls
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
    return mockValue;
  } else {
    // console.log(`Fetching from Next.js API: ${NEXTJS_API_BASE_URL}/${endpoint}`);
    try {
      const response = await fetch(`${NEXTJS_API_BASE_URL}/${endpoint}`);
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`API call failed for ${endpoint} with status: ${response.status}. Body: ${errorBody}`);
        throw new Error(`Failed to fetch ${endpoint}. Status: ${response.status}.`);
      }
      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error(`Error fetching ${endpoint} from Next.js API:`, error);
      // Fallback to mock data if API call fails in non-TEST env for resilience, or re-throw
      // For now, re-throwing to make errors visible during development.
      // You might want to return mockValue or an empty array in production for a better UX.
      // Example fallback:
      // console.warn(`Falling back to mock data for ${endpoint} due to API error.`);
      // return mockValue;
      throw error;
    }
  }
}

export const getTeams = () => fetchDataFromNextJsApi<Team[]>('teams', mockData.mockTeams);
export const getPlayers = () => fetchDataFromNextJsApi<Player[]>('players', mockData.mockPlayers);
export const getGames = () => fetchDataFromNextJsApi<Game[]>('games', mockData.mockGames);
export const getShotEvents = () => fetchDataFromNextJsApi<ShotEvent[]>('shot-events', mockData.mockShotEvents);
export const getPlayerStats = () => fetchDataFromNextJsApi<PlayerStats[]>('player-stats', mockData.mockPlayerStats);
export const getTeamPerformance = () => fetchDataFromNextJsApi<TeamPerformance[]>('team-performance', mockData.mockTeamPerformance);
