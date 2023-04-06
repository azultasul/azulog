import { useState, useEffect } from 'react'
import Results from '~/components/search/Results'
import styled from 'styled-components'
import Vars from '~/data/Variables'

import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox } from 'react-instantsearch-hooks-web'

const SearchStyle = styled.div`
  position: relative;
  .box {
    &__root {
      width: ${(props) => (props.isSearchOpened ? '190px' : '0px')};
      transition-property: width, visibility;
      transition-duration: 0.3s;
      transition-delay: ${(props) => (props.isSearchOpened ? '0s' : '0.3s')};
      margin-left: 2px;
      visibility: ${(props) => (props.isSearchOpened ? 'visible' : 'hidden')};
      overflow: hidden;
    }
    &__form {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid black;
    }
    &__input {
      border: none;
      background: transparent;
      font-size: 16px;
      padding: 0px 0px 2px 5px;
      // width: ${(props) => (props.isSearchOpened ? '170px' : '0px')};
      &:focus-visible {
        outline: none;
      }
    }
    &__submit {
      display: none;
    }
    &__reset {
      padding: 0px 5px;
    }
  }
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration {
    display: none;
  }
`

const searchClient = algoliasearch(`${process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}`, `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY}`)

const Loding = () => {
  return <div>Loading</div>
}

const Search = ({ isSearchOpened, color }) => {
  return (
    <SearchStyle color={color} isSearchOpened={isSearchOpened}>
      <InstantSearch searchClient={searchClient} indexName="azulog">
        <SearchBox classNames={{ root: 'box__root', form: 'box__form', input: 'box__input', submit: 'box__submit', reset: 'box__reset' }} loadingIconComponent={Loding} />
        <Results color={color} isSearchOpened={isSearchOpened} className="results" />
      </InstantSearch>
    </SearchStyle>
  )
}

export default Search
