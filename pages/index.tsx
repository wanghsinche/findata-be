import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const firstSection = <div className="container mx-auto h-screen">
    <div className="text-center px-3 lg:px-0">
      <h1 className="my-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight">
        FinanceData
      </h1>
      <p className="leading-normal text-gray-800 text-base md:text-xl lg:text-2xl mb-8">
        Retrieve finance data into your Google Sheet
      </p>

      <button className="mx-auto lg:mx-0 hover:underline text-white font-extrabold rounded my-2 md:my-6 py-4 px-8 shadow-lg w-48 bg-green-500">
        Try It
      </button>

    </div>

    <div className="flex items-center w-full mx-auto content-end">
      <div className="browser-mockup flex flex-1 m-6 md:px-0 md:m-12 bg-white w-1/2 rounded shadow-xl"></div>
    </div>
  </div>

  const secondSection = <section className="bg-gray-100 border-b py-8">
    <div className="container max-w-5xl mx-auto m-8">
      <h2 className="w-full my-2 text-5xl font-black leading-tight text-center text-gray-800">
        Title
      </h2>
      <div className="w-full mb-4">
        <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-5/6 sm:w-1/2 p-6">
          <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
            Lorem ipsum dolor sit amet
          </h3>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            at ipsum eu nunc commodo posuere et sit amet ligula.<br /><br />

            Images from:
            <a className="text-orange-500 underline" href="https://undraw.co/">undraw.co</a>
          </p>
        </div>
        <div className="w-full sm:w-1/2 p-6">
        </div>
      </div>

      <div className="flex flex-wrap flex-col-reverse sm:flex-row">
        <div className="w-full sm:w-1/2 p-6 mt-6">
        </div>
        <div className="w-full sm:w-1/2 p-6 mt-6">
          <div className="align-middle">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              Lorem ipsum dolor sit amet
            </h3>
            <p className="text-gray-600 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              at ipsum eu nunc commodo posuere et sit amet ligula.<br /><br />
              Images from:
              <a className="text-orange-500 underline" href="https://undraw.co/">undraw.co</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>


  return (
    <div>
      {firstSection}
      {secondSection}
    </div>
  )
}

export default Home
