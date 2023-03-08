import { createGlobalStyle } from "styled-components";

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

  // reset


  body {
    font-family: 'cafe';
    line-height: 1.5;

    margin: 0;
    padding: 0;
    background: #0f4c81;
    color: transparent;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
`;

export default GlobalStyle;