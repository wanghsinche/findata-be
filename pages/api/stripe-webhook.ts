import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Readable } from 'node:stream';
import { selectOrCreateCustomer, stripeServer } from '../../utils/stripe';
import { manageSubscriptionStatusChange, insertCustomer } from '../../utils/supabase-admin';
import { getWebhookSecret } from '../../utils/constant';

// // Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false
  }
};

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret =getWebhookSecret();
    let event: Stripe.Event;

    try {
      if (!sig || !webhookSecret) return res.status(400).send(`Webhook Error: no sig or webhookSecret `);
      event = stripeServer.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

      try {
        switch (event.type) {
          case 'customer.subscription.created':
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription;
            await manageSubscriptionStatusChange(
              subscription.id,
              subscription.customer as string,
              event.type
            );
            break;
          case 'checkout.session.async_payment_succeeded':
          case 'checkout.session.completed':
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;
            
            const email = checkoutSession.customer_details?.email || checkoutSession.customer_email as string;

            let subscriptionId:string = ''
            let customerId: string = ''

            if (checkoutSession.mode === 'subscription') {
              subscriptionId = checkoutSession.subscription as string;
              customerId = checkoutSession.customer as string;
              // update the customerId
              await insertCustomer(customerId, email)
            } 


            if (checkoutSession.mode === 'payment') {
              // manually create Customer and extend 30 days trials
              const customer = await selectOrCreateCustomer(email)
              // + next 30 days
              await stripeServer.customers.update(customer.id, {
                metadata: {
                  expiration: String(Date.now() + 30 * 3600 * 24)
                }
              })
            }
            
            if (checkoutSession.mode === 'setup') {
              throw new Error('Unhandled relevant mode! '+checkoutSession.mode);
            }
            

            

            break;
          default:
            throw new Error('Unhandled relevant event! '+event.type);
        }
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .send('Webhook error: "Webhook handler failed. View logs."');
      }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default webhookHandler;
