import { useState, useEffect, createContext } from 'react'
import { DefaultSeo } from 'next-seo'
import GlobalStyle from '~/styles/GlobalStyle'
import { Reset } from 'styled-reset'
import Layout from '~/components/layout/Layout'
import Cursor from '~/components/Cursor'
import Vars from '~/data/Variables'
import ColorContext from '~/store/ColorContext'

import '~/styles/fonts.css'

export default function App({ Component, pageProps }) {
  // const [themeColor, setThemeColor] = useState(6);
  const [themeColor, setThemeColor] = useState({ color: '#252525', index: 5 })
  const [loadState, setLoadState] = useState(false)

  const DEFAULT_SEO = {
    title: 'Azulog',
    description: `AzulTasul's blog / 따술의 블로그, 아쑬로그`,
    twitter: {
      handle: '@AzulTasul',
      site: '@Azulog',
      cardType: 'summary_large_image',
    },
  }

  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <ColorContext.Provider value={{ currColor: themeColor }}>
        {/* <Reset /> */}
        <Cursor loadState={loadState} setLoadState={setLoadState} />
        <GlobalStyle />
        <Layout themeColor={themeColor} setThemeColor={setThemeColor} setLoadState={setLoadState}>
          <Component {...pageProps} />
        </Layout>
      </ColorContext.Provider>
    </>
  )
}
