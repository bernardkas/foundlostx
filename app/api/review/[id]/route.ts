import prisma from '@/server/db';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: any }) {
  const { id } = params;
  const idNumber = parseInt(id, 10);
  if (!id) {
    return NextResponse.json({
      status: 400,
      error: 'Invalid request. Missing ID parameter.',
    });
  }

  try {
    const response = await prisma.review.delete({
      where: {
        id: idNumber,
      },
    });

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
