import prisma from '@/server/db';
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return Response.json({ status: 404, message: 'User not found' });
  }
  const user = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
  });

  try {
    if (user?.id) {
      const data = await prisma.lostAndFound.findMany({
        where: {
          userId: user.id,
        },
      });

      return NextResponse.json({ data });
    } else {
      return NextResponse.json({ status: 404, message: 'User not found' });
    }
  } catch (err) {
    console.log('Error fetching data from mongo', err);
    return NextResponse.error();
  }
}
