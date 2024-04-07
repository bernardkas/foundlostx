import { NextResponse } from 'next/server';
import prisma from '@/server/db';
import { revalidatePath } from 'next/cache';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { auth } from '@clerk/nextjs';

export async function POST(req: Request) {
  const body = await req.json();
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'No userId' });
  }

  const {
    name,
    lastname,
    phone,
    email,
    title,
    country,
    city,
    whereDidFind,
    exactLocation,
    description,
    findingDate,
    findingTime,
    mapAddress,
    photo,
    label,
    airoport,
    bus,
    train,
    ferry,
    taxi,
    generalLocation,
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
        country,
        city,
        whereDidFind,
        exactLocation,
        description,
        findingDate,
        findingTime,
        mapAddress,
        photo,
        label,
        airoport,
        bus,
        train,
        ferry,
        taxi,
        generalLocation,
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
