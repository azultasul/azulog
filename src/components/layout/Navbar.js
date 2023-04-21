import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Search from '~/components/search/Search'
import LinedButton from '~/components/LinedButton'
import useWindow from '~/utils/useWindow'
import styled from 'styled-components'
import Vars from '~/data/Variables'
import SearchIcon from '~/assets/icons/search.svg'

import Github from '~/assets/icons/github.svg'
import Home from '~/assets/icons/home.svg'
import HomeFilled from '~/assets/icons/home-filled.svg'
import { useRef } from 'react'

const NavStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${Vars.frameTop}px;
  z-index: 990;
  backdrop-filter: blur(5px);
  .nav {
    &-inner {
      position: relative;
      display: flex;
      // align-items: flex-end;
      align-items: center;
      justify-content: space-between;
      max-width: ${Vars.sizes.l}px;
      height: 100%;
      margin: 0 auto;
      padding-left: ${Vars.frame}px;
      padding-right: ${Vars.frame}px;
      padding-top: 7px;
    }
    &__progress {
      position: absolute;
      top: 100%;
      left: 0%;
      width: 0%;
      // width: ${(props) => props.scrollP}%;
      height: 2px;
      background: ${(props) => props.color};
      opacity: 0.6;
    }
  }
`

const PaletteStyle = styled.div`
  display: flex;
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
  gap: 8px;
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
  const progressRef = useRef(null)
  const [routeIndex, setRouteIndex] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrollP, setScrollP] = useState(0)
  const [windowSize, windowScroll] = useWindow()
  const logo = 'AZULOG'

  useEffect(() => {
    progressRef.current.style.width = `${scrollP * 100}%`
  }, [scrollP])

  useEffect(() => {
    const isDetailPage = document.body.dataset.pageName === 'detail'
    const isBlogPage = document.body.dataset.pageType === 'blog'
    if (isDetailPage && isBlogPage) {
      const totalScroll = document.body.scrollHeight - windowSize.h
      const progress = windowScroll.y / totalScroll
      setScrollP(progress)
    }
  }, [windowSize, windowScroll])

  useEffect(() => {
    setScrollP(0)
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
      <div className="nav__progress" ref={progressRef}></div>
    </NavStyle>
  )
}

export default Navbar
