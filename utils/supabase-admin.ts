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

    console.info('receive');
    // use stripe to manage the data


    // let { data: subscriptionData } = await supabaseServer
    // .from('subscription')
    // .select("id")
    // // Filters
    // .eq('subscription', subscriptionId)

    // if (subscriptionData?.length) {
    //     // existed, directly return
    //     console.info('id existed ', subscriptionId)
    //     return
    // }

    // const customer  = await stripeServer.customers.retrieve(
    //     customerId
    //   );


    // let { data: insertData, error } = await supabaseServer
    // .from('subscription')
    // .insert([
    //     { subscription: subscriptionId, email: (customer as Stripe.Customer).email, customerId },
    // ])

    // console.info(insertData, error)
}


export async function retrieveCustomer(email: string) {
    if (!email) throw 'No email'
    let { data: customerData, error } = await supabaseServer
    .from('customer')
    .select('id,created_at,email,customerId')
    // Filters
    .eq('email', email)
    .order('created_at', {
        ascending: true
    })

    if (!customerData?.length) {
        return
    }
    return customerData[customerData.length-1].customerId
}

export async function insertCustomer(customerId: string, email: string) {
    let { error } = await supabaseServer
    .from('customer')
    .insert([
        { email, customerId },
    ])
    console.info(error)
}
