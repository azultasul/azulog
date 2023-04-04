import Link from 'next/link'
import { useEffect, useRef, useState, useContext, createContext } from 'react'
import LinedButton from '~/components/LinedButton'
import PostCard from '~/components/PostCard'
import SortData from '~/components/SortData'

import Vars from '~/data/Variables'
import Cat from '~/data/Categories'
import styled from 'styled-components'
import ColorContext from '~/store/ColorContext'

const ContentsStyle = styled.div`
  display: flex;
  // gap: ${Vars.gap}px;
  gap: 44px;
  height: ${(props) => `calc(100vh - ${props.frameTotalH}px)`};
  overflow: scroll;
  list-style: none;
  .card {
    &-wrap {
      flex: 2.3;
      padding-left: ${(props) => `${props.contentsMargin + 32}px`};
    }
    &-inner {
      padding-bottom: ${Vars.frame}px;
    }
  }
`

const SortStyle = styled.div`
  flex: 1;
  position: sticky;
  top: 0;
  right: 0;
  height: ${(props) => `calc(100vh - ${props.frameTotalH}px)`};
  overflow-y: scroll;
  text-align: right;
  padding-right: ${(props) => `${props.contentsMargin}px`};
  padding-bottom: 20px;
  .lined-text {
    position: relative;
    font-family: 'cafe';
    font-size: 22px;
    font-weight: bold;
    margin: 4px 10px;
    line-height: 1.4;
  }
`

const PostList = ({ post, data, frameTotalH, catName }) => {
  const contentsRef = useRef(null)
  const [contentsMargin, setContentsMargin] = useState(0)

  const [sortNumByDate, setSortNumByDate] = useState(0)
  const [sortedDataByCat, setSortedDataByCat] = useState([])
  const [sortedData, setSortedData] = useState([])

  const sortDataByDate = (array) => {
    const sortedDataByDate =
      sortNumByDate === 0
        ? array.sort((a, b) => new Date(b.date) - new Date(a.date)) // 내림차순
        : array.sort((a, b) => new Date(a.date) - new Date(b.date)) // 오름차순

    return sortedDataByDate
  }

  useEffect(() => {
    setSortedData([...sortDataByDate(sortedData)])
  }, [sortNumByDate])

  useEffect(() => {
    setSortedData([...sortDataByDate(sortedDataByCat)])
  }, [sortedDataByCat])

  const resizeHandler = () => {
    const contentsW = contentsRef.current?.clientWidth
    setContentsMargin(contentsW > 1400 ? (contentsW - 1400) / 2 : 0)
  }

  useEffect(() => {
    resizeHandler()
    window.addEventListener('resize', () => {
      resizeHandler()
    })
  }, [])

  return (
    <ColorContext.Consumer>
      {(color) => (
        <ContentsStyle ref={contentsRef} frameTotalH={frameTotalH} contentsMargin={contentsMargin}>
          <div className="card-wrap">
            <div className="card-inner">
              {sortedData.map((data) => {
                const techList = data.tech.map((el) => Cat.tech[el])
                return <PostCard type={post} data={data} href={`/${post}/${data.id}`} tech={techList} key={data.id}></PostCard>
              })}
            </div>
          </div>
          <SortStyle color={color.currColor.color} contentsMargin={contentsMargin}>
            <LinedButton type="button" style="lined" title="NEWEST" onClick={() => setSortNumByDate(0)} className={sortNumByDate === 0 ? 'clicked' : ''} />
            <LinedButton type="button" style="lined" title="OLDEST" onClick={() => setSortNumByDate(1)} className={sortNumByDate === 1 ? 'clicked' : ''} />
            <br />
            <SortData post={post} data={data} catName={catName} setSortedDataByCat={setSortedDataByCat} buttonStyle="filled"></SortData>
          </SortStyle>
        </ContentsStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default PostList
