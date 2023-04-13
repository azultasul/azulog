import { useState, useEffect } from 'react'
import Falling from '~/components/Falling'
import FilledTitle from '~/components/FilledTitle'
import styled from 'styled-components'

import ColorContext from '~/store/ColorContext'

const IntroStyle = styled.section`
  width: 100%;
  height: 130vh;
  .back {
    font-family: 'chab';
    font-size: 120vh;
    line-height: 1;
    letter-spacing: -20vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-60%, -50%);
    z-index: -1;
    &--chang {
      font-family: 'chang';
    }
  }
  .text {
    &-wrap {
      font-family: 'cafe';
      font-size: 60px;
      font-weight: 700;

      // color: white;
      // -webkit-text-stroke: ${(props) => `1px ${props.color}`};
    }
  }
`

export default function Home() {
  useEffect(() => {
    document.body.dataset.pageName = 'home'
  }, [])

  return (
    <ColorContext.Consumer>
      {(color) => (
        <>
          <IntroStyle color={color.currColor.color}>
            {/* <div className="back">2023</div> */}
            {/* <div className="back back--chang">23</div> */}
            <div className="text-wrap c-container">
              <div>Frontend</div>
              <div>Developer</div>
              <div>DASOL's blog</div>
            </div>
          </IntroStyle>
        </>
      )}
    </ColorContext.Consumer>
  )
}
