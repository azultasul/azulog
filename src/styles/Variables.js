import { css } from 'styled-components'

const frame = '24px';
const frameTop = '50px';
const gap = '16px';

const backColor = '#f5f5f5';
const textColor = {
  wine: '#720e01',
  // peach: '#f59477',
  yellow: '#d49a51',
  skyblue: '#7ab7d4',
  blue: '#4e639e',
  purple: '#504ca8',
  black: '#252525',
}

const sizes = {
  l: 1400,
  md: 768,
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