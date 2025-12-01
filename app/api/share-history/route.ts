
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const shareHistory = await prisma.shareHistory.findMany();
    return NextResponse.json(shareHistory);
  } catch (error) {
    console.error('Error fetching share history:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
