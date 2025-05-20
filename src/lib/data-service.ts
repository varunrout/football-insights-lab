
// src/lib/data-service.ts
import type { Team, Player, Game, ShotEvent, PlayerStats, TeamPerformance } from '@/lib/mock-data';

const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;
const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:9002');

async function fetchDataFromNextJsApi<T>(endpoint: string): Promise<T> {
  // When fetching from a Server Component (typeof window === 'undefined'), an absolute URL is needed.
  // When fetching from a Client Component, a relative URL (/api/...) is fine.
  const baseUrl = typeof window === 'undefined' ? APP_DOMAIN : '';
  const fullUrl = `${baseUrl}/api/${endpoint}`;
  
  // console.log(`Fetching from Next.js API: ${fullUrl} (Env: ${APP_ENV})`);
  try {
    const response = await fetch(fullUrl, { cache: 'no-store' }); // Disable caching for dynamic data
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API call failed for ${fullUrl} with status: ${response.status}. Body: ${errorBody}`);
      throw new Error(`Failed to fetch ${endpoint}. Status: ${response.status}. URL: ${fullUrl}`);
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`Error fetching ${endpoint} from Next.js API (${fullUrl}):`, error);
    throw error;
  }
}

export const getTeams = () => fetchDataFromNextJsApi<Team[]>('teams');
export const getPlayers = () => fetchDataFromNextJsApi<Player[]>('players');
export const getGames = () => fetchDataFromNextJsApi<Game[]>('games');
export const getShotEvents = () => fetchDataFromNextJsApi<ShotEvent[]>('shot-events');
export const getPlayerStats = () => fetchDataFromNextJsApi<PlayerStats[]>('player-stats');
export const getTeamPerformance = () => fetchDataFromNextJsApi<TeamPerformance[]>('team-performance');
