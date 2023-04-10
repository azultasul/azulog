import { useState, useEffect, createContext, Children } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Vars from '~/data/Variables'
import ColorContext from '~/store/ColorContext'
import CloseCircle from '~/assets/icons/close-circle.svg'

const OpenContentsStyle = styled.div`
  position: fixed;
  right: ${Vars.frame}px;
  bottom: ${Vars.frame}px;
  z-index: 100;
  .inner {
    position: relative;
  }
  .button {
    position: absolute;
    bottom: -7px;
    right: -7px;
    padding: 2px;
    color: ${(props) => props.color};
    background: ${Vars.backColor};
    border-radius: 4px;
    font-family: 'cafe';
    font-size: 20px;
    font-weight: bold;
    line-height: 1;
    word-break: keep-all;
    transform: ${(props) => (props.isOpen ? 'scale(1)' : 'scale(1.3)')};
    transition-property: transform;
    transform-origin: bottom right;
    transition-duration: 0.4s;
    transition-delay: ${(props) => (props.isOpen ? '0s' : '0.2s')};
    z-index: 999;

    ${Vars.media.md`
      font-size: 20px;
    `};
    }
  }
  .contents {
    position: absolute;
    right: 0px;
    bottom: 0px;

    width: ${(props) => (props.isOpen ? props.contSize.width : '0px')};
    height: ${(props) => (props.isOpen ? props.contSize.height : '0px')};
    border: ${(props) => `1px solid ${props.color}`};
    border-radius: 18px 18px 2px 18px;
    // background: ${Vars.backColor};
    background: #f8f8ff;
    transition-property: width, height;
    transition-duration: 0.4s;
    transition-delay: ${(props) => (props.isOpen ? '0s' : '0.2s')};
    overflow: hidden;
    font-size: 15px;
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

const OpenContents = ({ button = [], contSize = { width: '240px', height: '30vh' }, children }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <ColorContext.Consumer>
      {(color) => (
        <OpenContentsStyle isOpen={isOpen} color={color.currColor.color} contSize={contSize}>
          <div className="inner">
            <button className="button" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <CloseCircle width={24} height={24} /> : button[0]}
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
