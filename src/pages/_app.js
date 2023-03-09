import Head from 'next/head'
import GlobalStyle from '~/styles/GlobalStyle'
import { Reset } from 'styled-reset'
import Layout from '~/components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Azulog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="AzulTasul's blog" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Reset />
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout> 
    </>
  )
}