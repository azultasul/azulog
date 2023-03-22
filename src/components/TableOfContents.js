import { useState, useEffect, createContext } from 'react';
import Link from 'next/link'
import styled from  'styled-components';
import Vars from "~/data/Variables";
import ColorContext from "~/store/ColorContext";

const TableOfContentsStyle = styled.div`
  position: fixed;
  left: ${Vars.frame}px;
  bottom: ${Vars.frame}px;
  .inner {
    position: relative;
  }
  .button {
    position: absolute;
    left: -7px;
    bottom: -7px;
  }
  .contents {
    position: absolute;
    left: 0px;
    bottom: 0px;
  }
  .button {
    font-family: 'cafe';
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
    color: ${props => props.color};
    background: ${Vars.backColor};
    word-break: keep-all;
    z-index: 999;
  }
  .contents {
    width: ${props => props.isOpen ? '250px' : '0px'};
    height: ${props => props.isOpen ? '30vh' : '0px'};
    font-size: 18px;
    font-weight: 400;
    border: ${props => `1px solid ${props.color}`};
    border-radius: 18px 18px 18px 2px;
    background: ${Vars.backColor};
    overflow: hidden;
    overflow-y: scroll;
    z-index: 998;
    transition-property: width, height;
    transition-duration: 0.4s;
    transition-delay: ${props => props.isOpen ? '0s' : '0.2s'};
    &-inner {
      width: 100%;
      height: calc(100% - 24px);
      padding: 10px 24px 32px;
      margin-top: 44px;
      overflow: scroll;
      opacity: ${props => props.isOpen ? 1 : 0};
      transition-duration: 0.2s;
      transition-delay: ${props => props.isOpen ? '0.4s' : '0s'};
    }
    &-h2-wrap {
      padding-left: 16px;
    }
    .title {
      position: absolute;
      top: 22px;
      left: 22px;
      border-bottom: 1px solid black;
      font-size: 24px;
      font-family: 'cafe';
      font-weight: bold;
      line-height: 0.9;
    }
    a {
      display: block;
    }
  }
`

const TableOfContents = ({ toc }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ColorContext.Consumer>
      {color => (
        <TableOfContentsStyle isOpen={isOpen} color={color.currColor.color}>
          <div className='inner'>
            <button className='button' onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'}</button>
            {/* <button className='button' onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'x' : '목차'}</button> */}
            <div className='contents'>
              <div className='contents-inner'>
                <div className='title'>목차</div>
                {Object.keys(toc).map((el, idx) => <div key={idx}>
                  <Link href={`#user-content-${idx}`}>{idx + 1}. {toc[el].title}</Link>
                  {toc[el].item && <div className='contents-h2-wrap'>
                    {toc[el].item.map((li,_idx) => <Link href={`#user-content-${idx}-${_idx}`} key={`${idx}-${_idx}`}>
                      {li}
                    </Link>)}
                  </div>}
                </div>)}
              </div>
            </div>
          </div>
        </TableOfContentsStyle>
      )}
    </ColorContext.Consumer>
  );
}

export default TableOfContents;