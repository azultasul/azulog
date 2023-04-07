import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Tag from '~/components/Tag'
import styled from 'styled-components'
import Vars from '~/data/Variables'

import { useInstantSearch, Hits, InfiniteHits, Highlight } from 'react-instantsearch-hooks-web'

const ResultsStyle = styled.div`
  position: absolute;
  width: ${(props) => (props.isSearchOpen ? '413.5px' : '0px')};
  height: auto;
  top: -3px;
  left: 2.5px;
  transform: translate(0px, 30px);
  border: ${(props) => (props.hasQuery ? `1px solid ${props.color}` : 'none')};
  border-radius: 2px 18px 18px 18px;

  opacity: ${(props) => (props.isSearchOpen ? 1 : 0)};
  transition: opacity 0.3s ${(props) => (props.isSearchOpen ? '0.6s' : '0s')}, width 0s ${(props) => (props.isSearchOpen ? '0s' : '0.9s')};
  background: ${Vars.backColor};
  .result {
    padding-top: 20px;
    &__inner {
      overflow: scroll;
      height: auto;
      max-height: 500px;
      padding: 0px 20px;
    }
    &__empty {
      padding-bottom: 20px;
      font-size: 16px;
      font-weight: 700;
      font-family: 'cafe';
      text-align: center;
    }
  }
  .hits {
    &__list {
      list-style-type: none;
      padding: 0;
    }
    &__item {
      text-align: left;
      font-size: 20px;
      padding: 12px 0px;
      border-top: ${(props) => `0.8px solid ${props.color}`};
      &:nth-of-type(1) {
        border-top: none;
        padding-top: 6px;
      }
    }
  }
  .hit {
    display: flex;
    &__image {
      display: inline-block;
      width: 50px;
      height: 50px;
      margin-right: 10px;
      & + .hit__text {
        width: calc(100% - 60px);
      }
    }
    &__thumb {
      height: 100%;
      object-fit: cover;
    }
    &__text {
      display: inline-block;
      width: 100%;
    }
    &__date {
      font-size: 10px;
      margin-top: 5px;
    }
    &__tech {
      font-size: 12px;
      margin-top: 8px;
      span {
        padding: 3px 8px;
      }
    }
  }
  .highligt {
    &__root {
      &--contents {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        margin-top: 8px;
      }
      &--title {
        line-height: 1.2;
        .highligt__highlighted {
        }
      }
    }
    &__highlighted {
      color: ${Vars.backColor};
      background: ${(props) => props.color};
    }
  }
`
const Hit = ({ hit }) => {
  return (
    <Link href={`/blog/${hit.id}`} className="hit">
      {hit?.thumb && (
        <div className="hit__image">
          <Image src={hit?.thumb} className="hit__thumb" alt="alt" unoptimized width="100" height="100" />
        </div>
      )}
      <div className="hit__text">
        {hit?.title ? <Highlight attribute="title" hit={hit} classNames={{ root: 'highligt__root--title', highlighted: 'highligt__highlighted' }} /> : '제목 없음'}
        <div className="hit__date">{hit?.date}</div>
        <Tag tagList={hit?.tech} className="hit__tech" />
      </div>
    </Link>
  )
}

const Results = ({ color, isSearchOpen, setIsSearchOpen, className }) => {
  const { indexUiState, setIndexUiState, results, uiState, setUiState, scopedResults, use, status, error } = useInstantSearch()

  const hasQuery = indexUiState && indexUiState.query
  const hasResults = (results?.hits ?? []).length > 0

  return (
    <ResultsStyle className={className} color={color} hasQuery={hasQuery} isSearchOpen={isSearchOpen}>
      {hasQuery && (
        <div className="result">
          <div className="result__inner">
            {hasResults && <Hits hitComponent={Hit} onClick={() => setIsSearchOpen(false)} classNames={{ list: 'hits__list', item: 'hits__item' }} />}
            {!hasResults && <div className="result__empty">검색 결과 없음 😢</div>}
          </div>
        </div>
      )}
    </ResultsStyle>
  )
}

export default Results
