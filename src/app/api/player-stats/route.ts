// src/app/api/player-stats/route.ts
import { NextResponse } from 'next/server';
import { mockPlayerStats } from '@/lib/mock-data';

export async function GET() {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
  try {
    if (appEnv !== 'TEST') {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
    }
    return NextResponse.json(mockPlayerStats);
  } catch (error) {
    console.error('Error in /api/player-stats:', error);
    return NextResponse.json({ message: 'Error fetching player stats data', error: (error as Error).message }, { status: 500 });
  }
}
