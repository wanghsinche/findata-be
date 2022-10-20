export const domain = `https://${process.env.DOMAIN}`
export const productName = 'FinData'
export const email = 'wang0xinzhe@gmail.com';

export const freeLimitation = process.env.LIMITATION || 500

export const supabaseUrl = 'https://tgubgmgavtnuuavwolvm.supabase.co'

export function getSupabaseKey(){
    return process.env.SUPABASE_APIKEY as string
} 


export function getProductID(){
    return (process.env.NODE_ENV === 'development' ?
    process.env.PRODUCT:
    process.env.PRODUCT_LIVE) as string
}

export function getWebhookSecret(){
    return (process.env.NODE_ENV === 'development' ?
    process.env.STRIPE_WEBHOOK_SECRET:
    process.env.STRIPE_WEBHOOK_SECRET_LIVE) as string
}

export function getStripeAPIKEY(){
    return (process.env.NODE_ENV === 'development' ?
    process.env.STRIPE_APIKEY:
    process.env.STRIPE_APIKEY_LIVE) as string
}

export function getRedisURL(){
    return process.env.REDIS
}