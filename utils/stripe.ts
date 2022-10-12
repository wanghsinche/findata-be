import Stripe from 'stripe';
import { getStripeAPIKEY, productName } from './constant';

export const stripeServer = new Stripe(getStripeAPIKEY(), {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-08-01',
  // Register this as an official Stripe plugin.
  // https://stripe.com/docs/building-plugins#setappinfo
  appInfo: {
    name: productName,
    version: '0.1.0'
  }
});
