import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/server/db';

interface Params {
  slug: any;
}

export const GET = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  const { slug } = params;
  console.log('slugg', slug);
  const slugAsNumber = parseInt(slug, 10);
  try {
    const response = await prisma.lostAndFound.findFirst({
      where: {
        id: slugAsNumber,
      },
    });

    return NextResponse.json({ response });
  } catch (err) {
    NextResponse.error();
    console.log(err);
  }
};
