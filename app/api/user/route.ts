import { NextResponse } from 'next/server';
import { prisma } from '@/server/db';

export async function POST(req: Request) {
  const body = await req.json();
  const { id, username, name, email, lastname, password } = body;
  try {
    const userPost = await prisma.user.create({
      data: {
        id,
        name,
        email,
        lastname,
        password,
        username,
      },
    });
    return NextResponse.json({ data: userPost });
  } catch (error) {
    console.log('Error creating entry', error);
    return NextResponse.error();
  }
}
