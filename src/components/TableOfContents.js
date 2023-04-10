import { useState, useEffect, createContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Vars from '~/data/Variables'
import OpenContents from '~/components/OpenContents'

const TableOfContentsStyle = styled.div`
  &.contents-inner {
    height: calc(100% - 24px);
    padding: 10px 16px 32px;
    margin-top: 39px;
  }
  .title {
    position: absolute;
    top: 18px;
    left: 14px;
    border-bottom: 1px solid black;
    font-size: 22px;
    font-family: 'cafe';
    font-weight: bold;
    line-height: 0.9;
  }
  a {
    display: block;
  }
  .sub-wrap {
    padding-left: 12px;
  }
`

const TableOfContents = ({ toc }) => {
  return (
    <OpenContents button={['목차', '닫기']}>
      <TableOfContentsStyle className="contents-inner">
        <div className="title">목차</div>
        {Object.keys(toc).map((el, idx) => (
          <div key={idx}>
            <Link href={`#user-content-${idx}`}>
              {idx + 1}. {toc[el].title}
            </Link>
            {toc[el].item && (
              <div className="sub-wrap">
                {toc[el].item.map((li, _idx) => (
                  <Link href={`#user-content-${idx}-${_idx}`} key={`${idx}-${_idx}`}>
                    {li}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </TableOfContentsStyle>
    </OpenContents>
  )
}

export default TableOfContents
