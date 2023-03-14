import { useState, useEffect } from 'react';
import styled from  'styled-components';
import Vars from "~/styles/Variables";

const PaletteStyle = styled.div`
  position: fixed;
  top: calc(${Vars.frame} - 16px);
  right: calc(${Vars.frame});
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const ColorStyle = styled.button`
  display: block;
  width: 11px;
  height: 11px;
  margin-bottom: 4.1px;
  margin-left: 5px;
  background: ${props => props.color};
  &:nth-of-type(${props => props.idx + 1}) {
    height: 17px;
  }
`

const Palette = ({ themeColor, setThemeColor }) => {

  useEffect(() => {
    document.body.dataset.themeColor = Object.keys(Vars.color).filter(el => el !== 'white')[themeColor];
  }, [themeColor])

  return (
    <PaletteStyle>
      {
        Object.keys(Vars.color)
        .filter(el => el !== 'white')
        .map((el, idx) => <ColorStyle color={Vars.color[el]} idx={themeColor} onClick={() => setThemeColor(idx)} key={idx}></ColorStyle>)
      }
    </PaletteStyle>
  )
}

export default Palette;