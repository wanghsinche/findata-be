import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>FinData</title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <meta name="author" content="" />
    </Head>
    <Component {...pageProps} />
  </>

}

export default MyApp
