import { useState, useEffect, createContext } from 'react';
import Link from 'next/link'
import styled from  'styled-components';
import Vars from "~/styles/Variables";
import ColorContext from "~/store/ColorContext";

const TableOfContentsStyle = styled.div`
  position: fixed;
  left: ${Vars.frame};
  bottom: ${Vars.frame};
  .inner {
    position: relative;
  }
  .button, .contents {
    position: absolute;
    left: 0px;
    bottom: 0px;
  }
  .button {
    // width: 50px;
    // height: 50px;
    // border-radius: 50%;
    // border: 1px solid black;
    // overflow: hidden;
    // &-inner {
    //   position: relative;
    //   width: 100%;
    //   height: 100%;
    // }
    button {
      // position: absolute;
      // left: 50%;
      // top: 50%;
      // transform: translate(-50%, -50%);
      font-family: 'cafe';
      font-size: 24px;
      font-weight: bold;
      line-height: 1;
      word-break: keep-all;
    }
    z-index: 999;
  }
  .contents {
    width: ${props => props.isOpen ? '250px' : '0px'};
    height: ${props => props.isOpen ? 'auto' : '0px'};
    font-size: 18px;
    font-weight: 400;
    border: ${props => `1px solid ${props.color}`};
    border-radius: 18px 18px 18px 2px;
    background: ${Vars.backColor};
    overflow: hidden;
    z-index: 998;
    &-inner {
      padding: 24px;
      padding-bottom: 32px;
    }
    a {
      display: block;
    }
  }
`

const TableOfContents = ({ toc }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ColorContext.Consumer>
      {color => (
        <TableOfContentsStyle isOpen={isOpen} color={color.currColor.color}>
          <div className='inner'>
            <div className='button'>
              <div className='button-inner'>
                <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? '닫기' : '목차'}</button>
              </div>
            </div>
            <div className='contents' onClick={() => setIsOpen(false)}>
              <div className='contents-inner'>
                {Object.keys(toc).map((el, idx) => <div key={idx}>
                  <Link href={`#user-content-${idx}`}>{toc[el].title}</Link>
                  <div>
                    {toc[el].item.map((li,_idx) => <Link href={`#user-content-${idx}-${_idx}`} key={`${idx}-${_idx}`}>
                      {li}
                    </Link>)}
                  </div>
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