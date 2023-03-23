import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from  'styled-components';
import Vars from "~/data/Variables"

const NavStyle = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${Vars.frameTop}px;
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
  top: calc(${Vars.frameTop}px + 4.25px);
  transform: translateY(-100%);
  display: flex;
  gap: 3px;
  flex-direction: row;
  align-items: flex-end;
`

const ColorStyle = styled.button`
  display: block;
  font-size: 28px;
  font-weight: bold;
  line-height: 1;
  color: ${props => props.color};
  background: transparent;
  &:nth-of-type(${props => props.idx + 1}) {
    transform: scale(1.17);
    transform-origin: 50% 80%;
  }
  &:hover {
    color: transparent;
    -webkit-text-stroke: ${props => `1px ${props.color}`};
    transition: color 0.2s;
  }
`

const LinkStyle = styled.ul`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  position: absolute;
  right: 12px;
  top: calc(${Vars.frameTop}px + 2.8px);
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
    text-align: center;
    &:nth-of-type(${props => props.routeIndex + 1}) {
      transform: scale(1.17);
      transform-origin: 50% 90%;
    }
    &:hover a {
      color: transparent;
      -webkit-text-stroke: ${props => `1px ${props.color}`};
      transition: 0.2s;
    }
  }
`

const Navbar = ({ themeColor, setThemeColor }) => {
  const router = useRouter();
  const [ routeIndex, setRouteIndex ] = useState(0);
  const logo = 'AZULOG';

  useEffect(() => {
    const path = router.route.split('/')[1];
    switch (path) {
      case 'about':
        setRouteIndex(1);
        break;
      case 'work':
        setRouteIndex(2);
        break;
      case 'blog':
        setRouteIndex(3);
        break;
      default:
        setRouteIndex(0);
    }
  }, [router])

  useEffect(() => {
    document.body.dataset.themeColor = Object.keys(Vars.textColor)[themeColor.index];
  }, [themeColor])

  return (
    <NavStyle color={themeColor.color}>
      <div className='nav-inner'>
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
        <LinkStyle color={themeColor.color} routeIndex={routeIndex}>
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