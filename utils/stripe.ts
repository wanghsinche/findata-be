import Stripe from 'stripe';
import { productName } from './constant';
const STRIPE_APIKEY = process.env.STRIPE_APIKEY as string;

export const stripeServer = new Stripe(STRIPE_APIKEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-08-01',
  // Register this as an official Stripe plugin.
  // https://stripe.com/docs/building-plugins#setappinfo
  appInfo: {
    name: productName,
    version: '0.1.0'
  }
});
