import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import Vars from '~/data/Variables'

import { useInstantSearch, Hits } from 'react-instantsearch-hooks-web'

const ResultsStyle = styled.div`
  position: absolute;
  width: 413.5px;
  height: auto;
  top: -3px;
  left: 2.5px;
  transform: translate(0px, 30px);
  padding: 16px 18px 0px;
  border: ${(props) => (props.hasQuery ? `1px solid ${props.color}` : 'none')};
  border-radius: 2px 18px 18px 18px;

  opacity: ${(props) => (props.isSearchOpened ? 1 : 0)};
  transition-property: opacity;
  transition-duration: 0.3s;
  transition-delay: ${(props) => (props.isSearchOpened ? '0.35s' : '0s')};
  background: ${Vars.backColor};
  .inner {
    overflow: scroll;
    height: auto;
    max-height: 500px;
  }
`

const Hit = ({ hit }) => {
  const words = hit?.contents?.split(' ').length
  return (
    <Link href={`/blog/${hit.id}`}>
      <div>
        <h3>{hit?.title ?? 'no title'}</h3>
      </div>
      {/* <p>{hit?.contents ?? ''}</p> */}
    </Link>
  )
}

const Results = ({ color, isSearchOpened, className }) => {
  const { indexUiState, setIndexUiState, results, uiState, setUiState, scopedResults, use, status, error } = useInstantSearch()

  const hasQuery = indexUiState && indexUiState.query
  const hasResults = (results?.hits ?? []).length > 0

  return (
    <ResultsStyle className={className} color={color} hasQuery={hasQuery} isSearchOpened={isSearchOpened}>
      <div className="inner">
        {hasQuery && hasResults && <Hits hitComponent={Hit} />}
        {hasQuery && !hasResults && <div>No results 😔</div>}
      </div>
    </ResultsStyle>
  )
}

export default Results
