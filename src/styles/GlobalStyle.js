import { css, createGlobalStyle } from "styled-components";
import Vars from "~/styles/Variables"

const GlobalStyle = createGlobalStyle`
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
    font-family: 'pretend';
    font-weight: 300;
    line-height: 1.7;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background: ${Vars.backColor};
  }
  button {
    padding: 0;
    margin: 0;
    border: 0;
  }
  a {
    text-decoration: none;
  }

  /* color mode (palette) */
  ${
    Object.keys(Vars.textColor).map(el => `
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

`;

export default GlobalStyle;