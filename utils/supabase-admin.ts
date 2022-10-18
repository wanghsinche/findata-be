import Stripe from 'stripe';
import { stripeServer } from './stripe';
import { createClient } from '@supabase/supabase-js'
import { getSupabaseKey } from './constant';

const supabaseUrl = 'https://tgubgmgavtnuuavwolvm.supabase.co'
const supabaseKey = getSupabaseKey()

export const supabaseServer = createClient(supabaseUrl, supabaseKey)


export async function manageSubscriptionStatusChange(
    subscriptionId: string,
    customerId: string,
    eventType: string
) {

    console.info('receive ', {
        subscriptionId, customerId, eventType
    });

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
    .single();

    if (!customerData) {
        return
    }
    return customerData.customerId
}

export async function insertCustomer(customerId: string, email: string) {
    let { error } = await supabaseServer
    .from('customer')
    .insert([
        { email, customerId },
    ])
    console.info('insert customer '+email+' '+customerId,error)
}

export async function searchField(word:string) {
    const { data, error } = await supabaseServer
    .from('autocomplete')
    .select('*')
    .textSearch('keyword', `'${word}'`)
    if (error){
        throw String(error)
    }

    return data
}