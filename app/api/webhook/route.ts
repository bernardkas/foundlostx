import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { prisma } from '@/server/db';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  const eventType = evt.type;

  console.log('user data', body);

  try {
    if (eventType === 'user.created' || eventType === 'user.updated') {
      const eventData = evt.data;

      await prisma?.user.upsert({
        where: { externalId: eventData.id },
        update: {
          externalId: eventData.id,
          username: eventData.username || '',
          name: eventData.first_name || '',
          lastname: eventData.last_name || '',
          email: {
            create: eventData.email_addresses.map(emailObj => ({
              email: emailObj.email_address,
            })),
          },
          password: eventData.password_enabled ? 'true' : 'false',
          attributes: eventData.object,
        },
        create: {
          externalId: eventData.id,
          username: eventData.username || '',
          name: eventData.first_name || '',
          lastname: eventData.last_name || '',
          email: {
            create: eventData.email_addresses.map(emailObj => ({
              email: emailObj.email_address,
            })),
          },
          password: eventData.password_enabled ? 'true' : 'false',
          attributes: eventData.object,
        },
      });
    }

    console.log('user data');
  } catch (error) {
    console.error('Error updating database:', error);
    return new Response('Error occurred', {
      status: 500,
    });
  }

  return new Response('', { status: 200 });
}
