import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MyBanner } from '../component/banner'
import styles from '../styles/Home.module.css'

const Page: NextPage = () => {
  const router = useRouter()
  const sessionId = router.query.session_id;
  const failed = router.query.failed;
  const email = router.query.email;
  const title = failed ? 'Payment failed' : sessionId ? 'Thanks for your payment!' : 'Loading';

  const result = sessionId ? <div className='text-ms'>Please redirect to your spreadsheet and reload it to fetch the latest status.<p>You will receive an email confirmation.</p></div> : '';

  const customerPortal = <a href='https://billing.stripe.com/p/login/28o3eV8FO1BJ7Mk000' target='_blank' rel="noreferrer" className='mx-auto lg:mx-0 bg-white text-gray-800 font-bold rounded my-6 py-4 px-8 shadow-lg'>
    Customer Portal
  </a>

  const extraBtn = sessionId ? <>
  <p className='text-ms mt-8'>
  {email}
  </p>
    <p className='text-ms'>
      You can use Customer Portal to review your payment as well
    </p>
    <div className='mt-10'>
        {customerPortal}
    </div>
    </> : ''

  return (
    <div >
      <section className="w-full mx-auto text-center bg-gray-100 pt-6 pb-12 my-bg-image" style={{ minHeight: '50vh' }}>
        <h2 className="w-full my-2 text-5xl font-black leading-tight text-center">
          {title}
        </h2>

        <div className="w-full my-4">
          <div className="h-1 mx-auto bg-gray-400 w-1/6 my-0 py-0 rounded-t"></div>
        </div>


        <h3 className="my-4 text-3xl ">
          {result}
        </h3>


        {extraBtn}

      </section>

    </div>
  )
}

export default Page
