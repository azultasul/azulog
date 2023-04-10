import { css, createGlobalStyle } from 'styled-components'
import Vars from '../data/Variables'

const GlobalStyle = createGlobalStyle`
  /* common */
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 1px;
    // ${Vars.media.l`
    //   font-size: ${100 / Vars.sizes.l}vw;
    // `};
    // ${Vars.media.md`
    //   font-size: ${100 / Vars.sizes.md}vw;
    // `};
  }
  body {
    font-family: 'pretend';
    font-weight: 300;
    line-height: 1.7;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background: ${Vars.backColor};
    // ${Vars.media.l`
    //   background: #ff000066;
    // `};
    // ${Vars.media.md`
    //   background: #0000ff66;
    // `};
    // ${Vars.media.sm`
    //   background: #00ff0066;
    // `};
  }
  button {
    padding: 0;
    margin: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
  img {
    width: 100%;
    height: auto;
    vertical-align: middle;
  }

  /* color mode (palette) */
  ${Object.keys(Vars.textColor).map(
    (el) => `
      body[data-theme-color=${el}] {
        color: ${Vars.textColor[el]};
        a {
          color: ${Vars.textColor[el]};
        }
        hr {
          border-style: none;
          border-top: 0.8px solid ${Vars.textColor[el]};
        }
      }
    `
  )}


  /* layout */
  body[data-page-name='list'] {
    .footer {
      display: none;
    }
  }

`

export default GlobalStyle
