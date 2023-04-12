import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'

import styled from 'styled-components'
import { SwitchTransition, Transition, CSSTransition } from 'react-transition-group'
import gsap from 'gsap'

const PageTransStyle = styled.div`
  .card-inner {
    transition: opacity 0.3s;
  }
  &.rotate-enter .card-inner {
    opacity: 0;
  }
  &.rotate-enter-active .card-inner {
    opacity: 1;
  }
  // &.rotate-enter-done .card-inner {
  //   opacity: 1;
  // }
  &.rotate-exit .card-inner {
    opacity: 0;
  }
  &.rotate-exit-active .card-inner {
    opacity: 0;
  }
`

// exit -> enter -> enter-done
const PageTrans = ({ transKey, transTimeout = 400, children }) => {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={transKey}
        onEnter={() => {
          window.scrollTo(0, 0)
        }}
        timeout={transTimeout}
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        classNames="rotate"
      >
        <PageTransStyle>{children}</PageTransStyle>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default PageTrans
