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