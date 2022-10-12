import Stripe from 'stripe';
import './console-re'
import { stripeServer } from './stripe';
export async function manageSubscriptionStatusChange(
    subscriptionId: string,
    customerId: string,
    createAction = false
) {
    const customer  = await stripeServer.customers.retrieve(
        customerId
      );
    console.re.log('manageSubscriptionStatusChange ',subscriptionId, customerId, createAction, (customer as Stripe.Customer).email)
    return true
}