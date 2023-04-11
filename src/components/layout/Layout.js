import styled from 'styled-components'
import Vars from '~/data/Variables'
import Navbar from '~/components/layout/Navbar'
import Footer from '~/components/layout/Footer'

const LayoutStyle = styled.main`
  padding-top: ${Vars.frameTop}px;
  // padding-right: ${Vars.frame}px;
  // padding-left: ${Vars.frame}px;
`

const Layout = ({ themeColor, setThemeColor, children }) => {
  return (
    <>
      <Navbar themeColor={themeColor} setThemeColor={setThemeColor}></Navbar>
      <LayoutStyle>{children}</LayoutStyle>
      <Footer></Footer>
    </>
  )
}

export default Layout
