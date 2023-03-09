import { css } from 'styled-components'

const gap = '16px';

const color = {
  background: '#f5f5f5',
  black: '#252525',
  blue: '#4e639e',
  yellow: '#d49a51',
  wine: '#720e01',
  skyblue: '#7ab7d4',
  peach: '#f59477',
  purple: '#504ca8',
}

const test = color.purple;

const sizes = {
  l: 1400,
  md: 768,
  sm: 380,
  minL: 320,
  maxL: 1920
}

const media = {
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

export default { gap, color, test, sizes, media }