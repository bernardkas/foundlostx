import { NextResponse } from 'next/server';
import prisma from '@/server/db';
import { revalidatePath } from 'next/cache';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export async function POST(req: Request) {
  const body = await req.json();
  const { userId } = auth();

  if (!userId) {
    NextResponse.json({ error: 'You need to Sign In' });
    return redirect('/sign-in');
  }

  const user = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
  });

  if (user?.subscriptions === 'premium') {
    const packageLimit = 1;
    const existingPostsCount = await prisma.lostAndFound.count({
      where: { userId: user.id },
    });

    if (existingPostsCount >= packageLimit) {
      return NextResponse.json({
        error: `You can't create more than ${packageLimit} per post.`,
      });
    }
  } else if (user?.subscriptions === 'enterprise') {
    const packageLimit = 999;
    const existingPostsCount = await prisma.lostAndFound.count({
      where: { userId: user.id },
    });

    if (existingPostsCount >= packageLimit) {
      return NextResponse.json({
        error: `You can't create more than ${packageLimit} per post.`,
      });
    }
  } else if (user?.subscriptions === 'basic') {
    const packageLimit = 1;
    const existingPostsCount = await prisma.lostAndFound.count({
      where: { userId: user.id },
    });

    if (existingPostsCount >= packageLimit) {
      return NextResponse.json({
        error: `You can't create more than ${packageLimit} per post.`,
      });
    }
  } else {
    return NextResponse.json({
      error: 'Invalid subscription level for the user.',
    });
  }

  let isPremium;
  if (user?.subscriptions === 'premium') {
    isPremium = true;
  } else {
    isPremium = false;
  }

  let enterprise;
  if (user?.subscriptions === 'enterprise') {
    enterprise = true;
  } else {
    enterprise = false;
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
        isPaid: isPremium,
        isEnterprise: enterprise,
        airoport,
        bus,
        train,
        ferry,
        taxi,
        generalLocation,
      },
    });
    revalidatePath('/posts');
    return NextResponse.json({
      status: 200,
      data: userPost,
      error: NextResponse.error(),
    });
  } catch (error) {
    console.log('Error creating entry', error);
    return NextResponse.error();
  }
}
