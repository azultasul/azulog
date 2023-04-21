import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import ColorContext from '~/store/ColorContext'
import useMousePos from '~/utils/useMousePos'
import useWindow from '~/utils/useWindow'

const MouseStyle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 13px;
  height: 13px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #008ce9;
  z-index: 999;
  pointer-events: none;

  &.click {
    width: 30px;
    height: 30px;
    background: transparent;
    border: 2px solid #008ce9;

    transition-property: width, height;
    transition-duration: 0.2s;
  }
`

const Cursor = () => {
  const router = useRouter()
  const [mousePos] = useMousePos()
  const [windowSize, windowScroll] = useWindow()
  const cursorRef = useRef(null)

  useEffect(() => {
    cursorRef.current.classList.remove('click')
  }, [router.pathname])

  useEffect(() => {
    cursorRef.current.style.left = `${mousePos.x}px`
    cursorRef.current.style.top = `${mousePos.y + windowScroll.y}px`
  }, [mousePos, windowScroll])

  useEffect(() => {
    document.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('mouseover', () => {
        cursorRef.current.classList.add('click')
      })
      element.addEventListener('mouseout', () => {
        cursorRef.current.classList.remove('click')
      })
    })

    return () => {
      document.querySelectorAll('a, button').forEach((element) => {
        element.removeEventListener('mouseover', () => {
          cursorRef.current.classList.add('click')
        })
        element.removeEventListener('mouseout', () => {
          cursorRef.current.classList.remove('click')
        })
      })
    }
  }, [])

  return <ColorContext.Consumer>{(color) => <MouseStyle ref={cursorRef} className="c-cursor"></MouseStyle>}</ColorContext.Consumer>
}

export default Cursor
