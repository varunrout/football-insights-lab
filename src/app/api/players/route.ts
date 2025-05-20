// src/app/api/players/route.ts
import { NextResponse } from 'next/server';
import { mockPlayers } from '@/lib/mock-data';

export async function GET() {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
  try {
    if (appEnv !== 'TEST') {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
    }
    return NextResponse.json(mockPlayers);
  } catch (error) {
    console.error('Error in /api/players:', error);
    return NextResponse.json({ message: 'Error fetching players data', error: (error as Error).message }, { status: 500 });
  }
}
