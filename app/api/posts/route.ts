import { NextResponse } from 'next/server';
import prisma from '@/server/db';

export async function GET(req: Request) {
  try {
    const user = await prisma.lostAndFound.findMany();
    return NextResponse.json({ user });
  } catch (error) {
    console.log('Error creating entry', error);
    return NextResponse.error();
  }
}
