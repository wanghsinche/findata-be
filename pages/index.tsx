import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { MyBanner } from '../component/banner'
import styles from '../styles/Home.module.css'
import { storeAddress } from '../utils/constant'

const Home: NextPage = () => {
  const firstSection = <div className="container mx-auto h-screen ">
    <div className="text-center px-3 lg:px-0" >
      <MyBanner />

      <button className="mx-auto lg:mx-0 hover:underline text-white font-extrabold rounded my-2 md:my-6 py-4 px-8 shadow-lg w-48 bg-green-500">
        <a href={storeAddress} target="_blank" rel="noreferrer">Get Start</a>
      </button>
    </div>

    <div className="flex items-center w-full mx-auto content-end">
      <div className="browser-mockup flex flex-1  md:px-0 md:m-12 bg-white rounded shadow-xl my-screenshot"/>
    </div>
  </div>

  const secondSection = <section className="bg-gray-100 border-b py-8">
    <div className="container max-w-5xl mx-auto m-8">
      <h2 className="w-full mb-2 mt-20 text-5xl font-black leading-tight text-center text-gray-800">
        Features
      </h2>
      <div className="w-full mb-4">
        <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-5/6 sm:w-1/2 p-6">
          <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
            Formula Builder
          </h3>
          <p className="text-gray-600 mb-8">
            The Formula Builder Panel makes you easily retrieve all the data in one click
          </p>
        </div>
        <div className="w-full sm:w-1/2 p-6">
          <Image src="/formula-builder.png" width={150} height={300} />
        </div>
      </div>

      <div className="flex flex-wrap flex-col-reverse sm:flex-row">
        <div className="w-full sm:w-1/2 p-6 mt-6">
          <Image src="/screenshot-sheet.png" width={400} height={200} />
        </div>
        <div className="w-full sm:w-1/2 p-6 mt-6">
          <div className="align-middle">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              Financial Statement
            </h3>
            <p className="text-gray-600 mb-8">
              The Quote Summary Module allows you to bring the balance sheet, income sheet and cashflow sheet into your spreadsheet
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-5/6 sm:w-1/2 p-6">
          <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
            Historical Quotes
          </h3>
          <p className="text-gray-600 mb-8">
            By using History Quotes Module, you can easily retrieve the years daily prices, volume and others in one click
          </p>
        </div>
        <div className="w-full sm:w-1/2 p-6">
          <Image src="/screenshot-chart.png" width={400} height={200} />
        </div>
      </div>


      <div className="flex flex-wrap flex-col-reverse sm:flex-row">
        <div className="w-full sm:w-1/2 p-6 mt-6">
          <Image src="/screenshot-crypto.png" width={400} height={200} />
        </div>
        <div className="w-full sm:w-1/2 p-6 mt-6">
          <div className="align-middle">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              Million Financial Data
            </h3>
            <p className="text-gray-600 mb-8">
              Track the value of all securities and asserts, including cryptocurrency, index and mutual fund
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>


  return (
    <div className='my-bg-image'>
      {firstSection}
      {secondSection}
    </div>
  )
}

export default Home
