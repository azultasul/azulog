import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Vars from '~/data/Variables'
import Navbar from '~/components/layout/Navbar'
import Footer from '~/components/layout/Footer'
import PageTrans from '~/components/transition/PageTrans'
import { useEffect } from 'react'

const LayoutStyle = styled.main`
  padding-top: ${Vars.frameTop}px;
  // padding-right: ${Vars.frame}px;
  // padding-left: ${Vars.frame}px;
  .load {
    font-size: 300px;
    color: red;
  }
`

const Layout = ({ themeColor, setThemeColor, setLoadState, children }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   console.log('loading', loading)
  // }, [loading])
  // // useEffect(() => {
  // //   loadState && setLoadState(false)
  // // }, [loadState])
  // useEffect(() => {
  //   const handleStart = (url) => {
  //     const isDetailPage = url.split('?')[1]
  //     if (isDetailPage) return
  //     url !== router.asPath && setLoading(true)
  //   }
  //   const handleComplete = (url) => {
  //     const isDetailPage = url.split('?')[1]
  //     if (isDetailPage) return
  //     url === router.asPath && setLoading(false)
  //   }

  //   router.events.on('routeChangeStart', handleStart)
  //   router.events.on('routeChangeComplete', handleComplete)
  //   router.events.on('routeChangeError', handleComplete)

  //   return () => {
  //     router.events.off('routeChangeStart', handleStart)
  //     router.events.off('routeChangeComplete', handleComplete)
  //     router.events.off('routeChangeError', handleComplete)
  //   }
  // })

  return (
    <>
      <Navbar themeColor={themeColor} setThemeColor={setThemeColor}></Navbar>
      {/* <LayoutStyle className="layout">{loading ? <div className="load">loading!!!!!!!!!!</div> : <>{children}</>}</LayoutStyle> */}
      {/* <PageTrans transKey={loading} setLoadState={setLoadState}> */}
      <PageTrans transKey={[router.query.id, router.pathname]} setLoadState={setLoadState}>
        <div className="trans-inner">
          <LayoutStyle className="layout">{children}</LayoutStyle>
          <Footer></Footer>
        </div>
      </PageTrans>
    </>
  )
}

export default Layout
