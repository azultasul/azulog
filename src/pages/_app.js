import { useState, useEffect } from 'react';
import Head from 'next/head'
import GlobalStyle from '~/styles/GlobalStyle'
import { Reset } from 'styled-reset'
import Layout from '~/components/layout/Layout';
import Palette from '~/components/Palette'

import '~/styles/fonts.css';

export default function App({ Component, pageProps }) {
  const [themeColor, setThemeColor] = useState(6);

  return (
    <>
      <Head>
        <title>Azulog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="AzulTasul's blog" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {/* <Reset /> */}
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Palette themeColor={themeColor} setThemeColor={setThemeColor}></Palette>
    </>
  )
}
