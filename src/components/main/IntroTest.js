import Link from 'next/link'
import { useReducer, useRef } from 'react'
import { useEffect } from 'react'
import Marquee from '~/components/Marquee'
import styled from 'styled-components'
import ColorContext from '~/store/ColorContext'

import useMousePos from '~/utils/useMousePos'
import useWindow from '~/utils/useWindow'
import { useState } from 'react'

const IntroStyle = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  // .back {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-55.6%, -50%);
  //   font-family: 'chab';
  //   font-size: 77vw;
  //   line-height: 1;
  //   letter-spacing: -10vw;
  // }
  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: transparent;
    // -webkit-text-stroke: ${(props) => `1px ${props.color}`};
    // -webkit-text-stroke: 1px #005ffc;
    -webkit-text-stroke: 1px #0045ea;
    // -webkit-text-stroke: 1px #0f4c81;

    will-change: transform;
    transition: transform 0.05 linear;
    &:last-child {
      // position: static;
      // color: ${(props) => props.color};
      // color: #005ffc;
      color: #0045ea;
      // color: #0f4c81;
    }

    &-wrap {
      font-family: 'cafe';
      font-size: 20vw;
      font-weight: 700;
      line-height: 1;
    }

    @keyframes k {
      0% {
        transform: translateY(0) rotate(0deg);
      }
      25% {
        transform: translateY(3vw) rotate(3deg);
      }
      50% {
        transform: translateY(0) rotate(8deg);
      }
      75% {
        transform: translateY(3vw) rotate(-3deg);
      }
      to {
        transform: translateY(0) rotate(-8deg);
      }
    }
    & > span {
      position: relative;
      display: inline-block;
      animation: k 7s ease-in-out infinite alternate;
    }

    &.text_1 > span {
      animation-delay: 0.1s;
    }
    &.text_2 > span {
      animation-delay: 0.2s;
    }
    &.text_3 > span {
      animation-delay: 0.3s;
    }
    &.text_4 > span {
      animation-delay: 0.4s;
    }
    &.text_5 > span {
      animation-delay: 0.5s;
    }
    &.text_6 > span {
      animation-delay: 0.6s;
    }
    &.text_7 > span {
      animation-delay: 0.7s;
    }
    &.text_8 > span {
      animation-delay: 0.8s;
    }
    &.text_9 > span {
      animation-delay: 0.9s;
    }
    &.text_10 > span {
      animation-delay: 1s;
    }
    &.text_11 > span {
      animation-delay: 1.1s;
    }
    &.text_12 > span {
      animation-delay: 1.2s;
    }
    &.text_13 > span {
      animation-delay: 1.3s;
    }
    &.text_14 > span {
      animation-delay: 1.4s;
    }
    &.text_15 > span {
      animation-delay: 1.5s;
    }
  }
`

const Intro = ({}) => {
  const ref = useRef(null)
  const [mousePos, delta, speed] = useMousePos()
  const [windowSize] = useWindow()

  useEffect(() => {
    const ratioW = mousePos.x / windowSize.w
    ref.current.querySelectorAll('.text').forEach((el, index) => {
      let transPosX = ((windowSize.w / 2 - mousePos.x) * index) / 40
      let transPosY = ((windowSize.h / 2 - mousePos.y) * index) / 40
      // let transPosX = ((mousePos.x - windowSize.w / 2) * index) / 40
      // let transPosY = ((mousePos.y - windowSize.h / 2) * index) / 40

      el.style.transform = `translate(${transPosX}px, ${transPosY}px) translate(-50%, -50%) rotate(${(0.5 - ratioW) * 30}deg)`
    })
  }, [mousePos])

  return (
    <ColorContext.Consumer>
      {(color) => (
        <IntroStyle color={color.currColor.color}>
          {/* <div className="back">23</div> */}
          <div className="text-wrap" ref={ref}>
            {Array(16)
              .fill()
              .map((el, index) => (
                <div className={`text text_${15 - index}`} key={index}>
                  <span>A</span>
                  <span>Z</span>
                  <span>U</span>
                  <br />
                  <span>L</span>
                  <span>O</span>
                  <span>G</span>
                </div>
              ))}
          </div>
          <Marquee></Marquee>
        </IntroStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default Intro
