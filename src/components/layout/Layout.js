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
`

const Layout = ({ themeColor, setThemeColor, setLoadState, children }) => {
  const router = useRouter()

  // useEffect(() => {
  //   loadState && setLoadState(false)
  // }, [loadState])

  return (
    <>
      <Navbar themeColor={themeColor} setThemeColor={setThemeColor}></Navbar>
      <PageTrans transKey={router.query.id || router.pathname} transTimeout={1200} setLoadState={setLoadState}>
        <div className="trans-inner">
          <LayoutStyle className="layout">{children}</LayoutStyle>
          <Footer></Footer>
        </div>
      </PageTrans>
    </>
  )
}

export default Layout
