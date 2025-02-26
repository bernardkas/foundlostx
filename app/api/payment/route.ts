import Stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import prisma from '@/server/db';

export async function POST(req: NextRequest) {
  const { userId } = auth();
  const user = await prisma.user.findUnique({
    where: {
      externalId: userId!,
    },
  });
  const userid = user?.id;
  try {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
    let data = await req.json();
    let price = data.priceId;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: process.env.STRIPE_URL_SUCCESS_PRODUCTION_REDIRECT,
      cancel_url: process.env.STRIPE_URL_CANCEL_PRODUCTION_REDIRECT,
      payment_intent_data: {
        metadata: {
          userId: Number(userid),
        },
      },
    });

    console.log('session', session);
    return NextResponse.json(session.url);
  } catch (err) {
    console.log(err);
  }
}
