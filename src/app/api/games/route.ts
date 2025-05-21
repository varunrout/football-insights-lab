// src/app/api/games/route.ts
import { NextResponse } from 'next/server';
import { mockGames } from '@/lib/mock-data';

export async function GET() {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
  const pythonBackendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    if (appEnv === 'TEST') {
      // Use mock data for TEST environment
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
      return NextResponse.json(mockGames);
    } else {
      // Fetch from Python backend for TEST_BACKEND, DEV, QUAL, PROD, etc.
      if (!pythonBackendBaseUrl) {
        console.error('Error: NEXT_PUBLIC_API_BASE_URL is not defined for Python backend.');
        return NextResponse.json({ message: 'Python API base URL not configured' }, { status: 500 });
      }
      const backendUrl = `${pythonBackendBaseUrl}/api/games`;
      // console.log(`Fetching from Python backend: ${backendUrl} (AppEnv: ${appEnv})`);
      const response = await fetch(backendUrl, { cache: 'no-store' });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error fetching from Python backend (${backendUrl}): ${response.status} ${errorText}`);
        return NextResponse.json({ message: `Error from Python backend: ${errorText}` }, { status: response.status });
      }
      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('Error in Next.js /api/games route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Error fetching games data in Next.js route', error: errorMessage }, { status: 500 });
  }
}
