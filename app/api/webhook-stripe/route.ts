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
    const paymentDate = new Date(session.created * 1000);

    console.log('session', session);

    if (event.type === 'charge.succeeded') {
      await prisma.user.update({
        where: {
          id: Number(customerId),
        },
        data: {
          subscriptions: 'premium',
          subscriptionsDate: paymentDate,
        },
      });

      await prisma.lostAndFound.updateMany({
        where: {
          userId: Number(customerId),
        },
        data: {
          isPaid: true,
        },
      });

      scheduleSubscriptionReversion(customerId, paymentDate);

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

async function scheduleSubscriptionReversion(
  customerId: any,
  paymentDate: Date
) {
  const oneMonthLater = new Date(
    paymentDate.getTime() + 30 * 24 * 60 * 60 * 1000
  );
  // const threeMinutesLater = new Date(paymentDate.getTime() + 3 * 60 * 1000); for testing 3 min
  const now = new Date();

  if (oneMonthLater > now) {
    setTimeout(async () => {
      await prisma.user.update({
        where: {
          id: Number(customerId),
        },
        data: {
          subscriptions: 'basic',
        },
      });
      await prisma.lostAndFound.updateMany({
        where: {
          userId: Number(customerId),
        },
        data: {
          isPaid: false,
        },
      });
    }, oneMonthLater.getTime() - now.getTime());
  }
}
