import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import Link from 'next/link'
import Image from 'next/image'
import Vars from "~/styles/Variables";
import styled from  'styled-components';

const TitleStyle = styled.div`
  position: relative;
  .title {
    &-wrap {
      position: absolute;
      width: 100%;
      left: 50%;
      transform: translate(-50%, 0%);
      z-index: 100;
      overflow: hidden;
      text-align: center;
      font-family: 'cafe';
      font-size: 300rem;
      font-weight: bold;
      line-height: 1.17;
    }
    &--lined {
      border-top: 1.5px solid red;
      border-bottom: 1.5px solid red;
    }
    &--filled {

    }
  }
`;

export const FilledTitle = ({ title }) => {

  return (
    <TitleStyle>
      <div className='title-wrap c-text-line'>
        <div className='title title--lined'>{title}</div>
      </div>
      <div className='title-wrap'>
        <div className='title title--filled'>{title}</div>
      </div>
    </TitleStyle>
  )
}

export default FilledTitle;