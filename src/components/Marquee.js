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
  // overflow: hidden;

  font-family: 'cafe';
  font-size: 8vw;
  font-weight: 700;
  line-height: 1.3;
  white-space: nowrap;
  .marquee {
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
    }
    &__blue {
      margin-top: 0.7vw;
    }
  }
`

const Marquee = ({}) => {
  const ref = useRef(null)
  const [num, setNum] = useState(1)
  const [windowSize] = useWindow()

  useEffect(() => {
    console.log(ref.current.offsetWidth, windowSize.w)
  }, [])
  return (
    <ColorContext.Consumer>
      {(color) => (
        <MarqueeStyle color={color.currColor.color}>
          <div className="marquee-wrap">
            <div className={`marquee__item`} ref={ref}>
              <span className="marquee__blue">💙</span>
              <span>FE Dev. DASOL's blog</span>
              <span className="marquee__blue">💙</span>
              <span>FE Dev. DASOL's blog</span>
              <span className="marquee__blue">💙</span>
            </div>
            {/* {Array(num - 1)
              .fill()
              .map((el, index) => (
                <div className={`text`} key={index}>
                  FE Dev. DASOL's blog
                </div>
              ))} */}
          </div>
        </MarqueeStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default Marquee
