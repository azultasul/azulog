import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
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
    &__emoji {
      margin-top: 0.7vw;
      transform-origin: 50% 39%;
      will-change: transform;
    }
  }
`

const Marquee = ({ text, emoji }) => {
  const ref = useRef(null)
  const [windowSize, windowScroll] = useWindow()
  const [arrayLeng, setArrayLeng] = useState()

  // const tl = gsap.timeline({
  //   // yes, we can add it to an entire timeline!
  //   scrollTrigger: {
  //     trigger: triggerRef.current,
  //     start: 'top center',
  //     toggleActions: 'play none none reverse',
  //     markers: true,
  //   },
  // })

  useEffect(() => {
    // console.log("tl", tl);
    // tl.from(titleRef.current, {
    //   duration: 0.5,
    //   autoAlpha: 0,
    //   ease: 'power1.out',
    //   delay: 0.1,
    //   y: 10,
    // }).from(textRef.current, {
    //   duration: 0.5,
    //   autoAlpha: 0,
    //   ease: 'power1.out',
    //   delay: 1,
    //   y: 10,
    // });
  }, [])

  useEffect(() => {
    if (!windowSize.w) return
    const mItem = ref.current.querySelector('.marquee__item')
    const mItemW = mItem.clientWidth
    const windowW = windowSize.w / Math.cos((13 * Math.PI) / 180)
    setArrayLeng(mItemW < windowW ? 1 + Math.ceil(windowW / mItemW) : 1)
  }, [windowSize])

  useEffect(() => {
    const progress = windowScroll.y / (windowSize.h * 1.5)
    ref.current.querySelectorAll('.marquee__item').forEach((el) => {
      el.style.transform = `translateX(-${100 * progress}%)`
      el.querySelector('.marquee__emoji').style.transform = `rotate(${-360 * progress}deg)`
    })
  }, [windowScroll])

  return (
    <ColorContext.Consumer>
      {(color) => (
        <MarqueeStyle color={color.currColor.color}>
          <div className="marquee-wrap">
            <div className={`marquee`} ref={ref}>
              {Array(arrayLeng)
                .fill()
                .map((el, index) => (
                  <div className="marquee__item" key={index}>
                    {emoji && <span className="marquee__emoji">{emoji}</span>}
                    {text && <span>{text}</span>}
                  </div>
                ))}
            </div>
          </div>
        </MarqueeStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default Marquee
