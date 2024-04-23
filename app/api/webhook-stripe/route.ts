import Stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/server/db';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
  const payload = await req.text();

  const sig = req.headers.get('Stripe-Signature');
  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBOOK_SECRET!
    );

    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session.metadata?.userId;

    if (event.type === 'charge.succeeded') {
      await prisma.user.update({
        where: {
          externalId: customerId,
        },
        data: {
          subscriptions: 'premium',
        },
      });
      return NextResponse.json({
        message: 'Subscription updated successfully',
      });
    } else {
      console.log('Not worked');
      return NextResponse.error();
    }
  } catch (err) {
    console.log(err);
  }

  return new Response('', { status: 200 });
}
