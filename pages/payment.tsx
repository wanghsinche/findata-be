import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

const isTest = process.env.NODE_ENV === 'development'

function getCheckout(priceId: string, email: string) {
  const query = new URLSearchParams()
  if (priceId) query.set('priceId', priceId)
  if (email) query.set('email', email)
  return `/api/stripe-checkout?${query.toString()}`
}

const priceTable = isTest ? [
  {
    desc: 'Monthly',
    price: 'price_1LrlWLFMVPfRQBioEBwGUkAG'
  },
  {
    desc: 'One Time',
    price: 'price_1LsMdAFMVPfRQBioEM8jx2XZ'
  },
] : [
  {
    desc: 'Monthly 8 USD',
    price: 'price_1LrlEhFMVPfRQBiov6gupghl'
  },
  {
    desc: 'Yearly 80 USD',
    price: 'price_1LrlEhFMVPfRQBioVtlLEK2b'
  },
]

const Page: NextPage = () => {
  const router = useRouter()
  const email = router.query.email as string;


  return (
    <div className={styles.container}>
      <Head>
        <title>FinanceSheet</title>
        <meta name="description" content="FinanceSheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.grid}>
          {priceTable.map(el => <a key={el.price} href={getCheckout(el.price, email)} target="blank" className={styles.card}>
            <p>
              {el.desc}
            </p>
          </a>)}
        </section>
      </main>
    </div>
  )
}

export default Page
