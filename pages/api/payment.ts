// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';
import { domain, priceId } from '../../utils/constant';

const STRIPE_APIKEY = process.env.STRIPE_APIKEY as string;

const stripe = new Stripe(STRIPE_APIKEY, {apiVersion:'2022-08-01'});

export default async function payment(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    
    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
          {
            price: priceId,
            // For metered billing, do not pass quantity
            quantity: 1,
          },
        ],
        // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
        // the actual Session ID is returned in the query parameter when your customer
        // is redirected to the success page.
        success_url: `${domain}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: domain,
      });
      
      // Redirect to the URL returned on the Checkout Session.
      // With express, you can redirect with:
    res.redirect(303, session.url as string);
      
}
