import { NextResponse } from 'next/server';
import prisma from '@/server/db';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const body = await req.json();

  const {
    userId,
    externalId, // Correct the variable name here
    user,
    name,
    lastname,
    phone,
    email,
    title,
    city,
    whereDidFind,
    exactLocation,
    description,
    findingDate,
    mapAddress,
    photo,
    label,
  } = body;

  try {
    const userPost = await prisma?.lostAndFound.create({
      data: {
        user: {
          connect: {
            externalId: userId,
          },
        },
        name,
        lastname,
        phone,
        email,
        title,
        city,
        whereDidFind,
        exactLocation,
        description,
        findingDate,
        mapAddress,
        photo,
        label,
      },
    });
    revalidatePath('/posts');
    console.log('User Post:', userPost);
    return NextResponse.json({ data: userPost });
  } catch (error) {
    console.log('Error creating entry', error);
    return NextResponse.error();
  }
}
