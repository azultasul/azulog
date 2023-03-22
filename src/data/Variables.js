import { css } from 'styled-components'

const frame = 24;
const frameTop = 40;
const gap = 16;

const backColor = '#f5f5f5';
const textColor = {
  red: '#720e01',
  // peach: '#f59477',
  yellow: '#c6880f',
  // skyblue: '#7ab7d4',
  green: '#025b4b',
  blue: '#2d4a9e',
  // blue: '#4e639e',
  purple: '#504ca8',
  black: '#252525',
}

const sizes = {
  l: 1400,
  md: 1024,
  sm: 380,
  minL: 320,
  maxL: 1920
}

const media = {
  xl: (...styles) => css`
    @media (max-width: ${sizes.maxL}px) {
      ${css(...styles)};
    }
  `,
  l: (...styles) => css`
    @media (max-width: ${sizes.l}px) {
      ${css(...styles)};
    }
  `,
  md: (...styles) => css`
    @media (max-width: ${sizes.md}px) {
      ${css(...styles)};
    }
  `, 
  sm: (...styles) => css`
    @media (max-width: ${sizes.sm}px) {
      ${css(...styles)};
    }
  `, 
  minL: (...styles) => css`
    @media (max-width: ${sizes.minL}px) {
      ${css(...styles)};
    }
  `, 
  maxL: (...styles) => css`
    @media (min-width: ${sizes.maxL}px) {
      ${css(...styles)};
    }
  `, 
}

const vars = { frame, frameTop, gap, backColor, textColor, sizes, media }

export default vars