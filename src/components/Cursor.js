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
  background: #0736ea;
  z-index: 999;
  pointer-events: none;
  ${Vars.media.sm`
    display: none;
  `};

  &.click {
    width: 30px;
    height: 30px;
    background: transparent;
    border: 2px solid #0736ea;

    transition-property: width, height;
    transition-duration: 0.2s;
  }
`

const Cursor = ({ loadState, setLoadState }) => {
  const router = useRouter()
  const [mousePos] = useMousePos()
  const [windowSize, windowScroll] = useWindow()
  const cursorRef = useRef(null)

  // useEffect(() => {
  //   cursorRef.current.classList.remove('click')
  // }, [router.pathname])

  useEffect(() => {
    setLoadState(true)
  }, [])

  useEffect(() => {
    cursorRef.current.style.left = `${mousePos.x}px`
    cursorRef.current.style.top = `${mousePos.y + windowScroll.y}px`
  }, [mousePos, windowScroll])

  useEffect(() => {
    if (!loadState) return
    cursorRef.current.classList.remove('click')

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseover', () => {
        cursorRef.current.classList.add('click')
      })
      el.addEventListener('mouseout', () => {
        cursorRef.current.classList.remove('click')
      })
    })
    setLoadState(false)

    return () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.removeEventListener('mouseover', () => {
          cursorRef.current.classList.add('click')
        })
        el.removeEventListener('mouseout', () => {
          cursorRef.current.classList.remove('click')
        })
      })
    }
  }, [loadState])

  return <ColorContext.Consumer>{(color) => <MouseStyle ref={cursorRef} className="c-cursor"></MouseStyle>}</ColorContext.Consumer>
}

export default Cursor
