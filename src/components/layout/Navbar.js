import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Search from '~/components/search/Search'
import styled from 'styled-components'
import Vars from '~/data/Variables'
import SearchIcon from '~/assets/search.svg'
import LinedButton from '~/components/LinedButton'

import Github from '~/assets/github.svg'
import Home from '~/assets/home.svg'
import HomeFilled from '~/assets/home-filled.svg'

const NavStyle = styled.div`
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
  // gap: 3px;
  flex-direction: row;
  align-items: flex-end;
`

const ColorStyle = styled.button`
  display: block;
  font-size: 28px;
  font-weight: bold;
  line-height: 1;
  color: ${(props) => props.color};
  background: transparent;
  &:nth-of-type(${(props) => props.idx + 1}) {
    // transform: scale(1.17);
    // transform-origin: 50% 80%;
    color: transparent;
    -webkit-text-stroke: ${(props) => `1px ${props.color}`};
  }
  &:hover {
    color: transparent;
    -webkit-text-stroke: ${(props) => `1px ${props.color}`};
    transition: color 0.2s;
  }
`

const LinkStyle = styled.ul`
  display: flex;
  align-items: center;
  // align-items: flex-end;
  gap: 8px;
  position: absolute;
  right: 12px;
  top: calc(${Vars.frameTop}px + 2.8px);
  transform: translateY(-100%);
  margin: 0;
  padding: 0;
  border: 0 none;
  list-style: none;
  a,
  svg {
    display: block;
  }
  li {
    font-family: 'cafe';
    color: ${(props) => props.color};
    font-size: 19px;
    font-weight: bold;
    line-height: 1;
    text-align: center;
    &.link:nth-of-type(${(props) => props.routeIndex + 1}) a {
      color: transparent;
      -webkit-text-stroke: ${(props) => `1px ${props.color}`};
    }
    &:hover a {
      color: transparent;
      -webkit-text-stroke: ${(props) => `1px ${props.color}`};
      transition: 0.2s;

      .hit__tech {
        color: ${Vars.backColor};
        -webkit-text-stroke: 0px;
      }
    }
  }
  .home {
    position: absolute;
  }
  .github {
    width: 20px;
    height: 20px;
    transform: translate(0px, -1px);
  }
  .search {
    display: flex;
    &__button {
      display: flex;
      align-items: center;
      transform: translate(0px, -1px);
    }
    &__text {
      opacity: ${(props) => (props.isSearchOpen ? 1 : 0)};
      font-size: 14px;
      font-weight: 600;
      transition-property: opacity;
      transition-delay: ${(props) => (props.isSearchOpen ? '0.6s' : '0.3s')};
      transition-duration: 0.3s;

      color: ${(props) => props.color};
      background: transparent;
      margin-right: 2px;
      &:hover {
        color: transparent;
        -webkit-text-stroke: ${(props) => `1px ${props.color}`};
        transition: color 0.15s;
      }
    }
    svg {
      transform: ${(props) => (props.isSearchOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
      transition-property: transform;
      transition-duration: 0.3s;
    }
  }
  svg,
  path {
    fill: ${(props) => props.color};
  }
`

const Navbar = ({ themeColor, setThemeColor }) => {
  const router = useRouter()
  const [routeIndex, setRouteIndex] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const logo = 'AZULOG'

  useEffect(() => {
    const path = router.route.split('/')[1]
    switch (path) {
      case 'work':
        setRouteIndex(1)
        break
      case 'blog':
        setRouteIndex(2)
        break
      default:
        setRouteIndex(0)
    }
  }, [router])

  useEffect(() => {
    document.body.dataset.themeColor = Object.keys(Vars.textColor)[themeColor.index]
  }, [themeColor])

  return (
    <NavStyle color={themeColor.color}>
      <div className="nav-inner">
        <PaletteStyle>
          {Object.keys(Vars.textColor).map((el, idx) => (
            <ColorStyle color={Vars.textColor[el]} idx={themeColor.index} onClick={() => setThemeColor({ color: Vars.textColor[el], index: idx })} key={idx}>
              {logo[idx]}
            </ColorStyle>
          ))}
        </PaletteStyle>
        <LinkStyle color={themeColor.color} routeIndex={routeIndex} isSearchOpen={isSearchOpen}>
          <div className="search">
            <button className="search__button" onClick={() => setIsSearchOpen((prev) => !prev)}>
              <span className="search__text">{isSearchOpen ? 'Close' : ''}</span>
              <SearchIcon width={20} height={20} viewBox="0 0 24 24" />
            </button>
            <Search isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} color={themeColor.color} />
          </div>
          <a href="https://github.com/azultasul" target="_blank" className="github">
            <Github width={20} height={20} viewBox="0 0 100 100"></Github>
          </a>
          <li className="link">
            <Link href="/">HOME</Link>
          </li>
          <li className="link">
            <Link href="/work">WORK</Link>
          </li>
          <li className="link">
            <Link href="/blog">BLOG</Link>
          </li>
        </LinkStyle>
      </div>
    </NavStyle>
  )
}

export default Navbar
