import { NextResponse } from 'next/server';
import prisma from '@/server/db';

export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  try {
    const post = await prisma.lostAndFound.findMany();

    return NextResponse.json({ post });
  } catch (error) {
    console.log('Error creating entry', error);
    return NextResponse.error();
  }
}
