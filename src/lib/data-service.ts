
// src/lib/data-service.ts
import * as mockData from '@/lib/mock-data';
import type { Team, Player, Game, ShotEvent, PlayerStats, TeamPerformance } from '@/lib/mock-data';

const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

// This is the base URL for the Next.js application itself.
// It's needed for server-side components to make absolute fetch requests to internal API routes.
// For Vercel, process.env.VERCEL_URL would be available (provides domain only). For local, we use NEXT_PUBLIC_APP_URL.
// If NEXT_PUBLIC_APP_URL is set, it takes precedence.
const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:9002');


async function fetchDataFromNextJsApi<T>(endpoint: string, mockValue: T): Promise<T> {
  if (APP_ENV === 'TEST') {
    // console.log(`Using mock data for ${endpoint} in TEST environment`);
    // Simulate async behavior for consistency with API calls
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
    return mockValue;
  } else {
    // When fetching from a Server Component (typeof window === 'undefined'), an absolute URL is needed.
    // When fetching from a Client Component, a relative URL (/api/...) is fine.
    const baseUrl = typeof window === 'undefined' ? APP_DOMAIN : '';
    const fullUrl = `${baseUrl}/api/${endpoint}`;
    
    // console.log(`Fetching from Next.js API: ${fullUrl} (Env: ${APP_ENV})`);
    try {
      const response = await fetch(fullUrl);
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`API call failed for ${fullUrl} with status: ${response.status}. Body: ${errorBody}`);
        throw new Error(`Failed to fetch ${endpoint}. Status: ${response.status}. URL: ${fullUrl}`);
      }
      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error(`Error fetching ${endpoint} from Next.js API (${fullUrl}):`, error);
      // For non-TEST environments, if the internal Next.js API call fails, re-throw.
      // In a real scenario, the Next.js API route itself would handle Python backend errors.
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
