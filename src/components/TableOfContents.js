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
  .button {
    position: absolute;
    left: -7px;
    bottom: -10px;
  }
  .contents {
    position: absolute;
    left: 0px;
    bottom: 0px;
  }
  .button {
    font-family: 'cafe';
    font-size: 24px;
    font-weight: bold;
    line-height: 1;
    color: ${props => props.color};
    word-break: keep-all;
    z-index: 999;
  }
  .contents {
    width: ${props => props.isOpen ? '250px' : '0px'};
    height: ${props => props.isOpen ? '45vh' : '0px'};
    font-size: 18px;
    font-weight: 400;
    border: ${props => `1px solid ${props.color}`};
    border-radius: 18px 18px 18px 2px;
    background: ${Vars.backColor};
    overflow: hidden;
    overflow-y: scroll;
    z-index: 998;
    transition-property: width, height;
    transition-duration: 0.3s;
    &-inner {
      margin: 24px;
      margin-bottom: 32px;
    }
    &-h2-wrap {
      padding-left: 16px;
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
            <button className='button' onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'x' : '목차'}</button>
            <div className='contents' onClick={() => setIsOpen(false)}>
              <div className='contents-inner'>
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