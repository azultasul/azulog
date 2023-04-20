import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import ColorContext from '~/store/ColorContext'
import Var from '~/data/Variables'

import useMousePos from '~/utils/useMousePos'
import useWindow from '~/utils/useWindow'

const MarqueeStyle = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  transform: translateX(-5%) rotate(-13deg);

  font-family: 'cafe';
  font-size: 7.5vw;
  font-weight: 700;
  line-height: 1.3;
  white-space: nowrap;
  .marquee {
    display: flex;
    gap: 2vw;
    &-wrap {
      width: 110vw;
      padding-top: 1.5vw;
      padding-bottom: 0.8vw;
      border-top: ${(props) => `2px solid ${props.color}`};
      border-bottom: ${(props) => `2px solid ${props.color}`};
      background: ${Var.backColor};
    }
    &__item {
      display: flex;
      gap: 2vw;
      will-change: transform;
    }
    &__blue {
      margin-top: 0.7vw;
      transform-origin: 50% 39%;
      will-change: transform;
    }
  }
`

const Marquee = ({}) => {
  const ref = useRef(null)
  const [windowSize, windowScroll] = useWindow()

  useEffect(() => {
    const progress = windowScroll.y / (windowSize.h * 1.5)
    ref.current.querySelectorAll('.marquee__item').forEach((el) => {
      el.style.transform = `translateX(-${120 * progress}%)`
      el.querySelector('.marquee__blue').style.transform = `rotate(${360 * progress}deg)`
    })
  }, [windowScroll])
  return (
    <ColorContext.Consumer>
      {(color) => (
        <MarqueeStyle color={color.currColor.color}>
          <div className="marquee-wrap">
            <div className={`marquee`} ref={ref}>
              <div className="marquee__item">
                <span className="marquee__blue">💙</span>
                <span>FE Dev. DASOL's blog</span>
              </div>
              <div className="marquee__item">
                <span className="marquee__blue">💙</span>
                <span>FE Dev. DASOL's blog</span>
              </div>
              <div className="marquee__item">
                <span className="marquee__blue">💙</span>
                <span>FE Dev. DASOL's blog</span>
              </div>
            </div>
          </div>
        </MarqueeStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default Marquee
