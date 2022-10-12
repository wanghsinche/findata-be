import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

const isTest = process.env.NODE_ENV === 'development'


const Page: NextPage = () => {
  const router = useRouter()
  const email = router.query.email;

  const testElement = isTest ? <a href={`https://buy.stripe.com/test_5kA29YePw4Klc5WdQQ?prefilled_email=${email}`} target="blank" className={styles.card}>
    <p>
      TEST 80 USD
    </p>
  </a> : null


  return (
    <div className={styles.container}>
      <Head>
        <title>FinanceSheet</title>
        <meta name="description" content="FinanceSheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.grid}>
          <a href={`https://buy.stripe.com/28o3eLd8f3eH6DS5kk?prefilled_email=${email}`} target="blank" className={styles.card}>
            <p>
              Monthly 8 USD
            </p>
          </a>
          <a href={`https://buy.stripe.com/9AQ3eLecj8z1ges3cd?prefilled_email=${email}`} target="blank" className={styles.card}>
            <p>
              Yearly 80 USD
            </p>
          </a>
          {testElement}
        </section>
      </main>
    </div>
  )
}

export default Page