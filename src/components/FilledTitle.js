import { useEffect, useRef, useState, useContext, createContext } from 'react';
import Matter from 'matter-js';
import Link from 'next/link'
import Image from 'next/image'
import Vars from "~/styles/Variables";
import styled from  'styled-components';
import ColorContext from "~/store/ColorContext";

const TitleStyle = styled.div`
  position: ${props => props.position || 'static'};
  left: ${props => props.left || '50%'};
  top: ${props => props.top || '50%'};
  transform: ${props => props.position === 'absolute' ? 'translate(-50%, 0%)' : ' translate(0%, 0%)'};
  .title {
    padding: 0 35px;
    z-index: 100;
    overflow: hidden;
    text-align: center;
    font-size: ${props => props.fontSize};
    font-weight: bold;
    line-height: 1.4;
    width: 100%;
    word-break: keep-all;
    &-wrap {
      position: relative;
    }
    &--lined {
      border-top: ${props => `1px solid ${props.color}`};
      border-bottom: ${props => `1px solid ${props.color}`};
      color: transparent;
      -webkit-text-stroke: ${props => `1px ${props.color}`};
    }
    &--filled {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

    }
    > div {
      margin-top: ${props => props.topGap || '30px'};
    }
  }
`;

export const FilledTitle = ({ title, top, left, fontSize, position, topGap }) => {

  return (
    <ColorContext.Consumer>
      {color => (
        <TitleStyle top={top} left={left} fontSize={fontSize} position={position} topGap={topGap} color={color.currColor.color}>
          <div className='title-wrap'>
            <div className='title title--lined'>
              <div>{title}</div>
            </div>
            <div className='title title--filled'>
              <div>{title}</div>
            </div>
          </div>
        </TitleStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default FilledTitle;