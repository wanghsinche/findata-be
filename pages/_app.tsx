import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { productName } from '../utils/constant'
import Layout from '../component/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>{productName}</title>
      <meta name="description" content="Powered by Yahoo Finance, FinData enables you to import all market stocks, ETFs, cryptocurrencies and finance statement to Google Sheets." />
      <meta name="keywords" content="findata google sheet addons extension stock" />
      <meta name="author" content="findata" />
      <meta name="google-site-verification" content="TXey7sFwuQUU4xYY2iklnrHAKriPDfkg6mOEndjaHZs" />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>

}

export default MyApp
