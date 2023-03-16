import styled from  'styled-components';
import Vars from "~/styles/Variables"

const FrameStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  padding: ${Vars.frame};
  pointer-events: none;

  div {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .c-line--top:before, .c-line--bottom:before {
    content: '';
    position: absolute;
    width: calc(100% + ${Vars.frame} * 2);
    height: ${Vars.frame};
    top: 0;
    left: -${Vars.frame};
    transform: translate(0, -100%);
    background: ${Vars.backColor}
  }
  .c-line--bottom:before {
    top: auto;
    bottom: 0;
    transform: translate(0, 100%);
  }
`
const HeaderStyle = styled.div`
  position: fixed;
  top: ${Vars.frameTop};
  left: ${Vars.frame};
  right: ${Vars.frame};
  bottom: auto;
  height: 104px;
`

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