import { forwardRef, useEffect, useRef, useState, useContext, createContext } from 'react';
import Vars from "~/data/Variables";
import styled from  'styled-components';
import ColorContext from "~/store/ColorContext";

const TitleStyle = styled.div`
  position: ${props => props.position || 'static'};
  left: ${props => props.left || '50%'};
  top: ${props => props.top || '50%'};
  transform: ${props => (props.position === 'absolute' || props.position === 'fixed') ? 'translate(-50%, 0%)' : ' translate(0%, 0%)'};
  font-family: 'cafe';
  font-size: ${props => props.fontSize};
  font-weight: bold;
  line-height: ${props => props.lineHeight || 1.7};
  width: ${props => props.position === 'fixed' ? `${Vars.sizes.l}px` : 'auto'};
  max-width: ${props => props.position === 'fixed' ? `calc(100vw - 2 * ${Vars.frame}px)` : 'auto'};
  .title {
    padding: 0 35px;
    z-index: 100;
    overflow: hidden;
    text-align: center;
    width: 100%;
    word-break: keep-all;
    &-wrap {
      position: relative;
      border-top: ${props => `1px solid ${props.color}`};
      border-bottom: ${props => `1px solid ${props.color}`};
    }
    &--lined {
      color: transparent;
      -webkit-text-stroke: ${props => `1px ${props.color}`};
    }
    &--filled {
      position: ${props => props.type === 'lined' ? 'absolute' : 'static'};
      left: ${props => props.type === 'lined' ? '50%' : 'auto'};
      top: ${props => props.type === 'lined' ? '50%' : 'auto'};
      transform: ${props => props.type === 'lined' ? 'translate(-50%, -50%)' : 'translate(0%, 0%)'};

    }
    > div {
      margin-top: ${props => `${props.topGap}` || '30px'};
    }
  }
`;

export const FilledTitle = forwardRef(({ type = 'normal', title, top, left, fontSize, position, topGap, lineHeight }, ref) => {

  return (
    <ColorContext.Consumer>
      {color => (
        <TitleStyle ref={ref} type={type} top={top} left={left} fontSize={fontSize} position={position} topGap={topGap} lineHeight={lineHeight} color={color.currColor.color}>
          <div className='title-wrap'>
            {type === 'lined' && <div className='title title--lined'>
              <div>{title}</div>
            </div>}
            <div className='title title--filled'>
              <div>{title}</div>
            </div>
          </div>
        </TitleStyle>
      )}
    </ColorContext.Consumer>
  )
});

export default FilledTitle;