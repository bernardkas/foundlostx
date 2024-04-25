import prisma from '@/server/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, comment, lostfoundId } = body;

  const { userId } = auth();
  const lostfound = parseInt(lostfoundId, 10);

  if (!userId) {
    return NextResponse.json({ error: 'You need to sign in' });
  }
  try {
    const createReview = await prisma.review.create({
      data: {
        user: {
          connect: {
            externalId: userId,
          },
        },
        name: name,
        comment: comment,
        lostfound: lostfoundId
          ? {
              connect: {
                id: lostfound,
              },
            }
          : undefined,
      },
    });

    return NextResponse.json({
      status: 200,
      data: createReview,
      error: NextResponse.error(),
    });
  } catch (err) {
    console.log(err);
  }
}

export async function GET() {
  try {
    const response = await prisma.review.findMany();

    return Response.json({
      status: 200,
      data: response,
      error: NextResponse.error(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: 500,
      data: null,
      error: 'Internal Server Error',
    });
  }
}
