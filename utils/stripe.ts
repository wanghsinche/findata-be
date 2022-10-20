import Stripe from 'stripe';
import { getStripeAPIKEY, productName } from './constant';
import { insertCustomer, retrieveCustomer } from './supabase-admin';

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

export async function selectOrCreateCustomer(email: string) {
  if (!email) throw 'No email'
  const oldCustomerId = await retrieveCustomer(email)
  
  if (oldCustomerId) {
    const oldUser = await stripeServer.customers.retrieve(oldCustomerId, {expand:['subscriptions']})
    if (oldUser && !oldUser.deleted) return oldUser
  }

  const fiftyDays = 1000 * 3600 * 24 * 15  // 15 days free trial for new user
  const name = email.split('@')[0]
  const customer = await stripeServer.customers.create({
    email, name, metadata: {
      expiration: String(Date.now()+fiftyDays)
    }
  })

  await insertCustomer(customer.id, email)
  console.log('a new user: '+email + ' ' +  customer.id)

  return customer
}

/**
 * subscription, one time payment, new user
 * @param email user email
 */
export async function getUserPlan(email: string): Promise<{
  email: string;
  plan: 'Premium' | 'Free' | 'One';
  expiration: number;
  customerId?: string;
}> {
  if (!email) return {
    email, plan: 'Free', expiration: 0
  } 

  const user = await selectOrCreateCustomer(email)

  if (user.deleted) {
    return {
      email, plan: 'Free', expiration: 0, customerId: user.id
    } 
  }


  const activePlan = user.subscriptions?.data.find(el => el.status === 'active');
  
  if (activePlan) {
    return {
      email, plan: 'Premium', expiration: activePlan.current_period_end, customerId: user.id
    }
  }

  // mannually added user, one time payment
  if (Number(user.metadata.expiration) > Date.now()) {
    return {
      email, plan: 'One', expiration: Number(user.metadata.expiration), customerId: user.id
    }
  }
  
  return {
    email, plan: 'Free', expiration: 0, customerId: user.id
  }

}