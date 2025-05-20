// src/app/api/games/route.ts
import { NextResponse } from 'next/server';
import { mockGames } from '@/lib/mock-data';

export async function GET() {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
  try {
    if (appEnv !== 'TEST') {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
    }
    return NextResponse.json(mockGames);
  } catch (error) {
    console.error('Error in /api/games:', error);
    return NextResponse.json({ message: 'Error fetching games data', error: (error as Error).message }, { status: 500 });
  }
}
