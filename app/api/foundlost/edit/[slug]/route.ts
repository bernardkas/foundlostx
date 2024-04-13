import prisma from '@/server/db';
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
