import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('Request Body:', body);
  const {
    userId,
    user,
    name,
    lastname,
    phone,
    email,
    title,
    city,
    whereDidFind,
    exatLocation,
    description,
    findingDate,
    mapAddress,
    photo,
    label,
  } = body;
  try {
    const userPost = await prisma.lostAndFound.create({
      data: {
        userId,
        user,
        name,
        lastname,
        phone,
        email,
        title,
        city,
        whereDidFind,
        exatLocation,
        description,
        findingDate,
        mapAddress,
        photo,
        label,
      },
    });
    return NextResponse.json({ data: userPost });
  } catch (error) {
    console.log('Error creating entry', error);
    return NextResponse.error();
  }
}
