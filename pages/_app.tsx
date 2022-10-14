import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { productName } from '../utils/constant'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>{productName}</title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <meta name="author" content="" />
      <meta name="google-site-verification" content="TXey7sFwuQUU4xYY2iklnrHAKriPDfkg6mOEndjaHZs" />
    </Head>
    <Component {...pageProps} />
  </>

}

export default MyApp
