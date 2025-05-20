// src/app/api/team-performance/route.ts
import { NextResponse } from 'next/server';
import { mockTeamPerformance } from '@/lib/mock-data';

export async function GET() {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
  try {
    if (appEnv !== 'TEST') {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
    }
    return NextResponse.json(mockTeamPerformance);
  } catch (error) {
    console.error('Error in /api/team-performance:', error);
    return NextResponse.json({ message: 'Error fetching team performance data', error: (error as Error).message }, { status: 500 });
  }
}
