export const priceId = 'price_1LrlZ8FMVPfRQBiogvN0ENMb';
export const domain = 'https://findata-be.vercel.com'
export const productName = 'financeSheet'

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