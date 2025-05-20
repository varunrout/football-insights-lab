// src/app/api/shot-events/route.ts
import { NextResponse } from 'next/server';
import { mockShotEvents } from '@/lib/mock-data';

export async function GET() {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
  try {
    if (appEnv !== 'TEST') {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
    }
    return NextResponse.json(mockShotEvents);
  } catch (error) {
    console.error('Error in /api/shot-events:', error);
    return NextResponse.json({ message: 'Error fetching shot events data', error: (error as Error).message }, { status: 500 });
  }
}
