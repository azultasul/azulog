import styled from  'styled-components';
import Vars from "~/styles/Variables"

const LayoutStyle = styled.main`
  padding-top: ${Vars.frameTop};
  padding-right: ${Vars.frame};
  padding-left: ${Vars.frame};
  padding-bottom: ${Vars.frame};
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