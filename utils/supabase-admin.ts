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
    .limit(1)
    // .single();
    if (!customerData?.length) {
        return
    }
    return customerData[0].customerId
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
    let res = await supabaseServer
    .from('autocomplete')
    .select('id, title, field, moduleName, path, submodule')
    .eq('field', word)
    .limit(20)

    if (res.data?.length) {
        return res.data
    }
    
    // fuzzy search

    let { data, error } = await supabaseServer
    .from('autocomplete')
    .select('id, title, field, moduleName, path, submodule')
    .textSearch('fts', word.split(' ').map(w=>`'${w}'`).join(' & '))
    .limit(20)

    if (error){
        throw String(error)
    }

    return data!
}
