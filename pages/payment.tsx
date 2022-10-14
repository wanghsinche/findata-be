import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import styles from '../styles/Home.module.css'
import { stripeServer } from '../utils/stripe'

const isTest = process.env.NODE_ENV === 'development'

function getCheckout(priceId: string, email: string) {
  const query = new URLSearchParams()
  if (priceId) query.set('priceId', priceId)
  if (email) query.set('email', email)
  return `/api/stripe-checkout?${query.toString()}`
}

function toMoney(num:number|null){
  if (!num) return '--'
  return (num/100).toFixed(2)
}

interface IProps {
  priceList: Stripe.Price[]
}

const Page: NextPage<IProps> = ({priceList}) => {
  const router = useRouter()
  const email = router.query.email as string;

  const myTable = priceList.filter(el=>el.active).map(el => <a key={el.id} href={getCheckout(el.id, email)} target="blank" className={styles.card}>
    <p>
      {(el.product as Stripe.Product)?.name}
    </p>
    <p>
      {el.currency} {toMoney(el.unit_amount)} {el.recurring?`/ ${el.recurring.interval}`:''}
    </p>
    <p>
      {el.metadata?.desc}
    </p>
  </a>)

  return (
    <div className={styles.container}>
      <Head>
        <title>FinanceSheet</title>
        <meta name="description" content="FinanceSheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.grid}>
          {myTable}
        </section>
      </main>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps(ctx:GetServerSidePropsContext) {
  const productId = ctx.query.product as string || 'prod_Max8KnDwRMwu9l'; // default product
  if (!productId) return { props: { priceList: [] } }
  // Fetch data from external API
  const priceData = await stripeServer.prices.search({query: `product: '${productId}' AND active:'true'`, expand: ['data.product']})

  // Pass data to the page via props
  return { props: { priceList: priceData.data } }
}



export default Page
