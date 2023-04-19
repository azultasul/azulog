import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import ColorContext from '~/store/ColorContext'
import useMousePos from '~/utils/useMousePos'

const MouseStyle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 13px;
  height: 13px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #3d88ed;
  z-index: 999;
  pointer-events: none;

  &.click {
    width: 30px;
    height: 30px;
    background: transparent;
    border: 2px solid #3d88ed;

    transition-property: width, height;
    transition-duration: 0.2s;
  }
`

const Cursor = () => {
  const [mousePos] = useMousePos()
  const cursorRef = useRef(null)

  useEffect(() => {
    cursorRef.current.style.left = `${mousePos.x}px`
    cursorRef.current.style.top = `${mousePos.y + mousePos.sy}px`
  }, [mousePos])

  useEffect(() => {
    document.querySelectorAll('a, button, [data-hover="click"]').forEach((element) => {
      element.addEventListener('mouseover', () => {
        cursorRef.current.classList.add('click')
      })
      element.addEventListener('mouseout', () => {
        cursorRef.current.classList.remove('click')
      })
    })
  }, [])

  return <ColorContext.Consumer>{(color) => <MouseStyle ref={cursorRef} className="c-cursor"></MouseStyle>}</ColorContext.Consumer>
}

export default Cursor
