import { NextResponse } from 'next/server';
import prisma from '@/server/db';
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: 'No user exist' });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        externalId: userId,
      },
    });
    return NextResponse.json({ data: user });
  } catch (error) {
    console.log('Error creating entry', error);
    return NextResponse.error();
  }
}
