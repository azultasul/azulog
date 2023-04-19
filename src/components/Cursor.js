import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import ColorContext from '~/store/ColorContext'
import useMouse from '~/utils/useMouse'

const MouseStyle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  background: red;
`

const Cursor = () => {
  const [mousePos] = useMouse()
  const cursorRef = useRef(null)

  useEffect(() => {
    // console.log('mousePos', mousePos)

    cursorRef.current.style.left = `${mousePos.x}px`
    cursorRef.current.style.top = `${mousePos.y}px`
  }, [mousePos])

  return <ColorContext.Consumer>{(color) => <MouseStyle ref={cursorRef}></MouseStyle>}</ColorContext.Consumer>
}

export default Cursor
