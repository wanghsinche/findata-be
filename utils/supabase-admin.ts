import Stripe from 'stripe';
import { stripeServer } from './stripe';
import { createClient } from '@supabase/supabase-js'
import { getSupabaseKey } from './constant';

const supabaseUrl = 'https://tgubgmgavtnuuavwolvm.supabase.co'
const supabaseKey = getSupabaseKey()

const supabaseServer = createClient(supabaseUrl, supabaseKey)


export async function manageSubscriptionStatusChange(
    subscriptionId: string,
    customerId: string,
    eventType: string
) {

    console.log('receive');

    let { data: subscriptionData } = await supabaseServer
    .from('subscription')
    .select("id")
    // Filters
    .eq('subscription', subscriptionId)

    if (subscriptionData?.length) {
        // existed, directly return
        console.log('id existed')
        return
    }

    const customer  = await stripeServer.customers.retrieve(
        customerId
      );


    let { data: insertData, error } = await supabaseServer
    .from('subscription')
    .insert([
        { subscription: subscriptionId, email: (customer as Stripe.Customer).email, customerId },
    ])

    console.log(insertData, error)
}

export async function verifyEmail(email: string) {
    let { data: subscriptionData, error } = await supabaseServer
    .from('subscription')
    .select('id,created_at,email,subscription,customerId')
    // Filters
    .eq('email', email)
    .order('created_at')

    if (!subscriptionData?.length) {
        return
    }

    const subscriptionId = subscriptionData[0].subscription;
    const customerId = subscriptionData[0].customerId;

    const subscription = await stripeServer.subscriptions.retrieve(subscriptionId);

    if (subscription.customer !== customerId) return

    if (subscription.status === 'active') return true

    if (subscription.status === 'trialing') return true

}