import { NextResponse } from 'next/server';
import prisma from '@/server/db';

export async function GET(req: Request) {
  try {
    const user = await prisma.user.findMany();
    return NextResponse.json({ data: user });
  } catch (error) {
    console.log('Error creating entry', error);
    return NextResponse.error();
  }
}
