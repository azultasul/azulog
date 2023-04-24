import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'

import styled from 'styled-components'
import { SwitchTransition, Transition, CSSTransition } from 'react-transition-group'
import gsap from 'gsap'

const PageTransStyle = styled.div`
  .trans-inner {
    transition: opacity 0.3s;
  }
  &.rotate-enter .trans-inner {
    opacity: 0;
  }
  &.rotate-enter-active .trans-inner {
    opacity: 1;
  }
  // &.rotate-enter-done .trans-inner {
  //   opacity: 1;
  // }
  &.rotate-exit .trans-inner {
    opacity: 0;
  }
  &.rotate-exit-active .trans-inner {
    opacity: 0;
  }
`

// exit -> enter -> enter-done
const PageTrans = ({ transKey, transTimeout = 400, setLoadState, type = 'normal', onEnterHandler, children }) => {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={transKey}
        onEnter={() => {
          window.scrollTo(0, 0)
          onEnterHandler && onEnterHandler()
        }}
        timeout={transTimeout}
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        classNames="rotate"
        onEntered={() => {
          type === 'normal' && setLoadState(true)
        }}
      >
        <PageTransStyle>{children}</PageTransStyle>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default PageTrans
