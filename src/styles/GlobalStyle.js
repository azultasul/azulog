import { createGlobalStyle } from "styled-components";
import Vars from "~/styles/Variables"

const GlobalStyle = createGlobalStyle`
  // font
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
    background: ${Vars.color.background};
  }
  .container {
    padding: ${Vars.gap};
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: ${Vars.gap};
  }

`;

export default GlobalStyle;