import { useState, useEffect } from 'react';
import Link from 'next/link'
import styled from  'styled-components';
import Vars from "~/styles/Variables"

const NavStyle = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${Vars.frameTop};
  z-index: 999;
  .nav-inner {
    position: relative;
    max-width: ${Vars.sizes.l}px;
    height: 100%;
    margin: 0 auto;
  }
`

const PaletteStyle = styled.div`
  position: absolute;
  left: 12px;
  top: calc(${Vars.frameTop} + 4.25px);
  transform: translateY(-100%);
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

const ColorStyle = styled.button`
  display: block;
  margin-right: 2px;
  font-size: 28px;
  font-weight: bold;
  line-height: 1;
  color: ${props => props.color};
  background: transparent;
  &:nth-of-type(${props => props.idx + 1}) {
    font-size: 30px;
  }
  &:hover {
    color: transparent;
    -webkit-text-stroke: ${props => `1px ${props.color}`};
    transition: 0.2s;
  }
`

const LinkStyle = styled.ul`
  display: flex;
  position: absolute;
  right: 12px;
  top: calc(${Vars.frameTop} + 2.8px);
  transform: translateY(-100%);
  margin: 0;
  padding: 0;
  border: 0 none;
  list-style: none;
  li {
    font-family: 'cafe';
    color: ${props => props.color};
    font-size: 19px;
    font-weight: bold;
    line-height: 1;
    margin-left: 10px;
    &:hover a {
      color: transparent;
      -webkit-text-stroke: ${props => `1px ${props.color}`};
      transition: 0.2s;
    }
  }
`

const Navbar = ({ themeColor, setThemeColor }) => {
  const logo = 'AZULOG';

  useEffect(() => {
    document.body.dataset.themeColor = Object.keys(Vars.textColor)[themeColor.index];
  }, [themeColor])

  return (
    <NavStyle color={themeColor.color}>
      <div className='nav-inner'>
        {/* <Palette themeColor={color} setThemeColor={setThemeColor}></Palette> */}
        <PaletteStyle>
          {
            Object.keys(Vars.textColor)
            .map((el, idx) => (
            <ColorStyle color={Vars.textColor[el]} idx={themeColor.index} onClick={() => setThemeColor({color: Vars.textColor[el], index: idx})} key={idx}>
              {logo[idx]}
            </ColorStyle>
            ))
          }
        </PaletteStyle>
        <LinkStyle color={themeColor.color}>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/about">ABOUT</Link>
          </li>
          <li>
            <Link href="/work">WORK</Link>
          </li>
          <li>
            <Link href="/blog">BLOG</Link>
          </li>
        </LinkStyle>
      </div>
    </NavStyle>
  )
}

export default Navbar;