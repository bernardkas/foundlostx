import prisma from '@/server/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: any }) {
  const { slug } = params;
  const idNumber = parseInt(slug, 10);

  if (!slug) {
    return NextResponse.json({
      status: 400,
      error: 'Invalid request. Missing ID parameter.',
    });
  }

  try {
    const response = await prisma.lostAndFound.delete({
      where: { id: idNumber },
    });

    return NextResponse.json({
      status: 200,
      data: response,
      error: 'Not deleted check console',
    });
  } catch (err) {
    console.log('Somthing went wrong', err);
    NextResponse.error();
  }
}

export async function POST(req: Request, { params }: { params: any }) {
  const body = await req.json();
  const { slug } = params;
  const idNumber = parseInt(slug, 10);

  const { isPaid } = body;

  try {
    const response = await prisma.lostAndFound.update({
      where: {
        id: idNumber,
      },
      data: {
        isPaid: isPaid,
      },
    });

    return NextResponse.json({
      status: 200,
      data: response,
      error: 'Not deleted check console',
    });
  } catch (error) {
    console.log('Somthing wrong', error);
    return NextResponse.error();
  }
}
