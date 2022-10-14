import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MyBanner } from '../component/banner'
import styles from '../styles/Home.module.css'

const Page: NextPage = () => {
  const router = useRouter()
  const sessionId = router.query.session_id;

  const title = sessionId ? 'Thank you for your payment!':'Payment failed'

  const result = sessionId? <div className='text-ms'>Please reload your spreadsheet to retrieve the latest status.<p>You will receive an email confirmation.</p></div>:'';

  return (
    <div >
      <section className="w-full mx-auto text-center bg-gray-100 pt-6 pb-12" style={{height:'50vh'}}>
      <h2 className="w-full my-2 text-5xl font-black leading-tight text-center">
        {title}
      </h2>
      <div className="w-full mb-4">
        <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
      </div>

      <h3 className="my-4 text-3xl ">
        {result}
      </h3>

    </section>

    </div>
  )
}

export default Page
