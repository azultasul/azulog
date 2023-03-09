import styled from  'styled-components';
import Vars from "~/styles/Variables"

const FrameStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  padding: ${Vars.gap};
  pointer-events: none;

  div {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .line {
    position: absolute;
    top: 0;
    left: 0;
    background: ${Vars.test};
    &--right {
      left: auto;
      right: 0;
    }
    &--bottom {
      top: auto;
      bottom: 0;
    }
  }
  .line--top, .line--bottom {
    width: 100%;
    height: 2px;
  }
  .line--right, .line--left {
    width: 2px;
    height: 100%;
  }
  .line--top:before, .line--bottom:before {
    content: '';
    position: absolute;
    width: calc(100% + ${Vars.gap} * 2);
    height: ${Vars.gap};
    top: 0;
    left: -${Vars.gap};
    transform: translate(0, -100%);
    background: ${Vars.color.background}
  }
  .line--bottom:before {
    top: auto;
    bottom: 0;
    transform: translate(0, 100%);
  }
`
const HeaderStyle = styled.div`
  position: fixed;
  top: ${Vars.gap};
  left: ${Vars.gap};
  right: ${Vars.gap};
  bottom: auto;
  height: 104px;
  background: ${Vars.test};
`

const LayoutStyle = styled.div`
  padding-top: calc(${Vars.gap} + 104px);
  padding-right: ${Vars.gap};
  padding-left: ${Vars.gap};
  padding-bottom: ${Vars.gap};
`

const Layout = ({ children }) => {
  return (
    <>
      <FrameStyle>
        <div>
          <span className='line line--top'></span>
          <span className='line line--right'></span>
          <span className='line line--bottom'></span>
          <span className='line line--left'></span>
        </div>
      </FrameStyle>
      <HeaderStyle></HeaderStyle>
      <LayoutStyle>
        <main>{children}</main>
      </LayoutStyle>
    </>
  )
}

export default Layout;