import { useState, useEffect, createContext } from 'react';
import Head from 'next/head'
import GlobalStyle from '~/styles/GlobalStyle'
import { Reset } from 'styled-reset'
import Layout from '~/components/layout/Layout';
import Navbar from '~/components/layout/Navbar';
import Vars from "~/data/Variables";
import ColorContext from "~/store/ColorContext";


import '~/styles/fonts.css';

export default function App({ Component, pageProps }) {
  // const [themeColor, setThemeColor] = useState(6);
  const [themeColor, setThemeColor] = useState({color: '#252525', index: 5});
  useEffect(() => {

  }, [])

  return (
    <>
      <Head>
        <title>Azulog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="AzulTasul's blog" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <ColorContext.Provider value={{currColor: themeColor}}>
        {/* <Reset /> */}
        <GlobalStyle />
        <Navbar themeColor={themeColor} setThemeColor={setThemeColor}></Navbar>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ColorContext.Provider>
    </>
  )
}
