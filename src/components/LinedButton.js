import Link from 'next/link'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import ColorContext from '~/store/ColorContext'
import useMouseHover from '~/utils/useMouseHover'

const LinedStyle = styled.div`
  display: inline-block;
  position: relative;
  .lined-text {
    display: inline-block;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 5px;
      width: 0%;
      height: 1px;
      background: ${(props) => props.color};
    }
  }
  &.lined {
    .lined-text {
      color: transparent;
      -webkit-text-stroke: ${(props) => `1px ${props.color}`};
    }
  }
  &.filled {
    .lined-text {
      color: ${(props) => props.color};
    }
  }
  &:hover,
  &:has(.clicked) {
    .lined-text {
      transform: ${(props) => (props.direction === 'left' ? 'skew(20deg)' : 'skew(-20deg)')};
      transition: 0.3s;
      &:after {
        width: 100%;
        transition: width 0.3s;
      }
    }
    &.lined {
      .lined-text {
        color: ${(props) => props.color};
      }
    }
    &.filled {
      .lined-text {
        color: transparent;
        -webkit-text-stroke: ${(props) => `1px ${props.color}`};
      }
    }
  }
`

const LinedButton = ({ type, style = 'filled', title, onClick, href, direction = 'right', children, className }) => {
  // style: filled / lined
  const ref = useRef(null)
  const mouseEvent = useMouseHover(ref)

  return (
    <ColorContext.Consumer>
      {(color) => (
        <LinedStyle ref={ref} color={color.currColor.color} className={`${style}`} direction={direction}>
          {type === 'button' ? (
            <button onClick={onClick} className={`lined-text lined-button ${className}`}>
              {title}
              <>{children}</>
            </button>
          ) : type === 'link' ? (
            <Link href={href} onClick={onClick} className={`lined-text lined-link ${className}`}>
              {title}
              <>{children}</>
            </Link>
          ) : (
            <>
              <div className={`lined-text ${className}`}>{title}</div>
              <>{children}</>
            </>
          )}
        </LinedStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default LinedButton
