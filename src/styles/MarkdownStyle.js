import Vars from '~/data/Variables'
import styled from 'styled-components'

const MarkdownStyle = styled.section`
  font-size: 18px;
  line-height: 1.5;
  // max-width: 800px;
  // margin: 60px auto 0;
  margin-top: 60px;
  ${Vars.media.md`
    font-size: 16px;
  `};
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'cafe';
  }
  h1 {
    font-size: 2em;
    margin-top: 1.9em;
    margin-bottom: 0.5em;
    line-height: 1.3;
    ${Vars.media.md`
      font-size: 1.8em;
    `};
  }
  h2 {
    margin-top: 1.2em;
    margin-bottom: 0.6em;
  }
  h3 {
    margin-top: 1em;
    margin-bottom: 0.4em;
  }
  p {
    margin: 0px;
  }
  a {
    text-decoration: underline;
  }
  img {
    margin-top: 12px;
  }
  blockquote {
    margin: 12px 0 12px;
    padding-left: 20px;
    border-left: 3.5px solid rgb(37, 37, 37, 0.6);
  }
  code {
    background: rgb(37, 37, 37, 0.07);
    padding: 1.5px 4px;
    border-radius: 3.5px;
    color: rgb(255, 87, 87, 0.9);
  }
  pre {
    background: rgb(37, 37, 37, 0.03);
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 20px 30px;
    border-radius: 3.5px;
    overflow: scroll;
    ${Vars.media.md`
      padding: 15px 23px;
    `};
    code {
      background: transparent;
      padding: 0;
      color: black;
    }
  }
  hr {
    margin-top: 0px;
    margin-bottom: 1em;
  }
  ul,
  ol {
    ${Vars.media.md`
      padding-inline-start: 30px;
    `};
  }
`

export default MarkdownStyle
