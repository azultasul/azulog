import { useState, useRef, useEffect, createContext, Children } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import useMouseHover from '~/utils/useMouseHover'
import Vars from '~/data/Variables'
import ColorContext from '~/store/ColorContext'
import CloseIcon from '~/assets/icons/close.svg'

const OpenContentsStyle = styled.div`
  position: fixed;
  right: ${Vars.frame + 6}px;
  bottom: ${Vars.frame + 6}px;
  z-index: 100;
  .inner {
    position: relative;
  }
  .button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    bottom: 0px;
    right: 0px;
    transform: translate(30%, 30%);

    background: ${(props) => props.color};
    border-radius: 50%;
    word-break: keep-all;
    // transform: ${(props) => (props.isOpen ? 'scale(1)' : 'scale(1.3)')};
    // transition-property: transform;
    // transform-origin: bottom right;
    // transition-duration: 0.4s;
    // transition-delay: ${(props) => (props.isOpen ? '0s' : '0.2s')};
    z-index: 999;

    ${Vars.media.md`
      font-size: 20px;
    `};

    svg,
    path {
      fill: #f8f8ff;
    }
  }
  .contents {
    position: absolute;
    right: 0px;
    bottom: 0px;

    width: ${(props) => (props.isOpen ? '270px' : '0px')};
    height: ${(props) => (props.isOpen ? '40vh' : '0px')};
    border: ${(props) => `1px solid ${props.color}`};
    border-radius: 18px 18px 18px 18px;
    background: #f8f8ff;
    transition-property: width, height;
    transition-duration: 0.4s;
    transition-delay: ${(props) => (props.isOpen ? '0s' : '0.2s')};
    overflow: hidden;
    font-size: 16px;
    font-weight: 400;
    z-index: 998;

    ${Vars.media.md`
      position: fixed;
      top: auto;
      right: 0px;
      bottom: 0px;
      left: 0px;
      width: 100%;
      border: none;
      border-top: ${(props) => `1px solid ${props.color}`};
      border-radius: 18px 18px 0px 0px;
      transition-property: height;
    `};
    &-inner {
      width: 100%;
      height: 100%;
      overflow: scroll;
      opacity: ${(props) => (props.isOpen ? 1 : 0)};
      transition-duration: 0.2s;
      transition-delay: ${(props) => (props.isOpen ? '0.4s' : '0s')};
    }
  }
`

const OpenContents = ({ button, children }) => {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const mouseEvent = useMouseHover(ref)

  return (
    <ColorContext.Consumer>
      {(color) => (
        <OpenContentsStyle isOpen={isOpen} color={color.currColor.color}>
          <div className="inner">
            <button className="button" onClick={() => setIsOpen(!isOpen)} ref={ref}>
              {isOpen ? <CloseIcon width={18} height={18} viewBox="0 0 24 24" /> : button}
              {/* {isOpen ? 'Close' : 'Open'} */}
            </button>
            <div className="contents">{children}</div>
          </div>
        </OpenContentsStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default OpenContents
