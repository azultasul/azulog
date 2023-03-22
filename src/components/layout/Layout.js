import styled from  'styled-components';
import Vars from "~/data/Variables"

const LayoutStyle = styled.main`
  padding-top: ${Vars.frameTop}px;
  padding-right: ${Vars.frame}px;
  padding-left: ${Vars.frame}px;
  // padding-bottom: ${Vars.frame}px;
`

const Layout = ({ children }) => {
  return (
    <>
      <LayoutStyle>
        {children}
      </LayoutStyle>
    </>
  )
}

export default Layout;