// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { selectOrCreateCustomer, stripeServer } from '../../utils/stripe'

interface IResult {
  error?: string
}

function getDomain(req:NextApiRequest){
  if (req.headers.origin) return req.headers.origin
  if (req.headers.referer) {
    const url = new URL(req.headers.referer as string)
    return `${url.protocol}//${url.host}`  
  }
  return 'https://findata-be.vercel.app/'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResult>
) {
  const priceId = req.query.priceId as string
  const email = req.query.email as string

  if (!priceId) return res.status(400).json({
    error: 'No PriceId'
  })
  
  const modeMap: Record<Stripe.Price.Type, Stripe.Checkout.SessionCreateParams.Mode> = {
    'one_time': 'payment',
    'recurring': 'subscription'
  }

  try {
    const price = await stripeServer.prices.retrieve(priceId);
    
    let customer:Stripe.Customer|null = null

    if (email){
      customer = await selectOrCreateCustomer(email)
    }

    const checkoutSession = await stripeServer.checkout.sessions.create({
      mode: modeMap[price.type],
      success_url: `${getDomain(req)}/result?session_id={CHECKOUT_SESSION_ID}&email=${email||''}`,
      cancel_url: `${getDomain(req)}/result?failed=true`,
      customer: customer?.id,
      line_items: [{
        price: priceId,
        quantity: 1
      },]
    })

    res.redirect(303, checkoutSession.url as string);

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: String(error)
    })
  }

}
