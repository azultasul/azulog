import { css, createGlobalStyle } from "styled-components";
import Vars from "~/styles/Variables"

const GlobalStyle = createGlobalStyle`
  /* font */
  @font-face {
    font-family: 'elice';
    src: url('/fonts/EliceDigitalCodingOTF_Regular.woff2') format('woff2');
    font-style: normal;
    font-weight: 400;
  }
  @font-face {
    font-family: 'elice';
    src: url('/fonts/EliceDigitalCodingOTF_Bold.woff2') format('woff2');
    font-style: bold;
    font-weight: 700;
  }
  @font-face {
    font-family: 'cafe';
    src: url('/fonts/Cafe24Ohsquareair.woff2') format('woff2');
    font-style: normal;
    font-weight: 400;
  }
  @font-face {
    font-family: 'cafe';
    src: url('/fonts/Cafe24Ohsquare.woff2') format('woff2');
    font-style: bold;
    font-weight: 700;
  }
  @font-face {
    font-family: 'dang';
    src: url('/fonts/Cafe24Dangdanghae.woff2') format('woff2');
    font-style: normal;
    font-weight: 400;
  }

  /* common */
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 1px;
    ${Vars.media.l`
      font-size: ${100/Vars.sizes.l}vw;
    `};
    ${Vars.media.md`
      font-size: ${100/Vars.sizes.md}vw;
    `};
  }
  body {
    font-family: 'cafe';
    line-height: 1.5;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background: ${Vars.color.white};
  }
  button {
    padding: 0;
    margin: 0;
    border: 0;
  }

  /* color mode (palette) */
  ${
    Object.keys(Vars.color).filter(el => el !== 'white').map(el => `
      body[data-theme-color=${el}] {
        color: ${Vars.color[el]};
        .line {
          background: ${Vars.color[el]};
        }
      }
    `)
  }

  /* layout */
  .container {
    padding: ${Vars.frame};
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    // gap: ${Vars.gap};
  }

  .line {
    position: absolute;
    top: 0;
    left: 0;
    &--top {
      width: 100%;
      height: 2px;
    }
    &--right {
      left: auto;
      right: 0;
      width: 2px;
      height: 100%;
    }
    &--bottom {
      top: auto;
      bottom: 0;
      width: 100%;
      height: 2px;
    }
    &--left {
      width: 2px;
      height: 100%;
    }
  }

`;

export default GlobalStyle;