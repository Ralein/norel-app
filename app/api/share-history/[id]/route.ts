
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const shareHistory = await prisma.shareHistory.findMany({
      where: { profileId: id },
    });
    if (!shareHistory) {
      return NextResponse.json({ error: 'Share history not found' }, { status: 404 });
    }
    return NextResponse.json(shareHistory);
  } catch (error) {
    console.error(`Error fetching share history for profile with id ${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
