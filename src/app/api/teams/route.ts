// src/app/api/teams/route.ts
import { NextResponse } from 'next/server';
import { mockTeams } from '@/lib/mock-data';

export async function GET() {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV;

  try {
    // Simulate network delay for non-TEST environments to mimic real API call
    // In a real scenario for DEV/QUAL/PROD, this Next.js API route would fetch from the Python backend.
    if (appEnv !== 'TEST') {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
    }
    // For this exercise, always return mock data from this Next.js API route.
    // The differentiation of TEST vs API call happens in the frontend data-service.ts.
    return NextResponse.json(mockTeams);
  } catch (error) {
    console.error('Error in /api/teams:', error);
    return NextResponse.json({ message: 'Error fetching teams data', error: (error as Error).message }, { status: 500 });
  }
}
