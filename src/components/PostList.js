import Link from 'next/link'
import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import LinedButton from '~/components/LinedButton'
import PostCard from '~/components/PostCard'
import SortData from '~/components/SortData'
import OpenContents from '~/components/OpenContents'
import PageTrans from '~/components/transition/PageTrans'
import useWindow from '~/utils/useWindow'

import Vars from '~/data/Variables'
import Cat from '~/data/Categories'
import FilterIcon from '~/assets/icons/filter.svg'
import styled from 'styled-components'
import ColorContext from '~/store/ColorContext'

const ContentsStyle = styled.div`
  display: flex;
  // gap: ${Vars.gap}px;
  gap: 30px;
  // gap: 44px;
  height: ${(props) => `calc(100vh - ${props.titleTotalH + 40}px)`};
  padding-right: ${Vars.frame}px;
  padding-left: ${Vars.frame}px;
  overflow: scroll;
  list-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${Vars.media.md`
    display: block;
  `};
  .card {
    &-wrap {
      flex: 2.3;
      padding-left: ${(props) => `${props.contentsMargin}px`};
    }
    &-inner {
      padding-bottom: 30px;
      ${Vars.media.md`
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      `};
    }
  }
  .empty {
    width: 100%;
    height: 100px;
    margin-top: 50px;
    overflow: hidden;
    font-family: 'cafe';
    font-size: 30px;
    font-weight: 700;
    font-style: italic;
    line-height: 100px;
    text-align: center;
  }
`

const SortStyle = styled.div`
  flex: 1;
  position: sticky;
  top: 0;
  right: 0;
  height: ${(props) => `calc(100vh - ${props.titleTotalH}px)`};
  overflow-y: scroll;
  text-align: right;
  padding-right: ${(props) => `${props.contentsMargin}px`};
  padding-bottom: 20px;
  ${Vars.media.md`
    text-align: left;
  `}
  &.contents-inner {
    padding: 0px 14px 32px 14px;
    margin-top: 20px;
  }
  .lined-text {
    position: relative;
    font-family: 'cafe';
    font-size: 22px;
    font-weight: bold;
    margin: 4px 10px;
    line-height: 1.4;
    ${Vars.media.md`
      font-size: 18px;
      margin: 2px 8px;
    `}
  }
`

const PostList = ({ post, data, titleTotalH, catName }) => {
  const router = useRouter()
  const contentsRef = useRef(null)
  const [contentsMargin, setContentsMargin] = useState(0)

  const [sortNumByDate, setSortNumByDate] = useState(0)
  const [sortedDataByCat, setSortedDataByCat] = useState([])
  const [sortedData, setSortedData] = useState([])

  const [windowSize] = useWindow()

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
    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return (
    <ColorContext.Consumer>
      {(color) => (
        <ContentsStyle ref={contentsRef} titleTotalH={titleTotalH} contentsMargin={contentsMargin}>
          <div className="card-wrap">
            <PageTrans transKey={router.asPath}>
              <div className="card-inner">
                {sortedData.length > 0 ? (
                  sortedData.map((data) => {
                    const techList = data.tech?.map((el) => Cat.tech[el])
                    return <PostCard type={post} data={data} href={`/${post}/${data.id}`} tech={techList} key={data.id}></PostCard>
                  })
                ) : (
                  <div className="empty">
                    <div className="card">NOTHING~ 👀</div>
                  </div>
                )}
              </div>
            </PageTrans>
          </div>
          {windowSize.w > Vars.sizes.md ? (
            <SortStyle color={color.currColor.color} contentsMargin={contentsMargin}>
              <LinedButton type="button" style="lined" title="NEWEST" onClick={() => setSortNumByDate(0)} className={sortNumByDate === 0 ? 'clicked' : ''} />
              <LinedButton type="button" style="lined" title="OLDEST" onClick={() => setSortNumByDate(1)} className={sortNumByDate === 1 ? 'clicked' : ''} />
              <br />
              <SortData post={post} data={data} catName={catName} setSortedDataByCat={setSortedDataByCat} buttonStyle="filled"></SortData>
            </SortStyle>
          ) : (
            <OpenContents button={<FilterIcon width={18} height={18} viewBox="0 0 24 24" />}>
              <SortStyle color={color.currColor.color} contentsMargin={contentsMargin} className="contents-inner">
                <LinedButton type="button" style="lined" title="NEWEST" onClick={() => setSortNumByDate(0)} className={sortNumByDate === 0 ? 'clicked' : ''} />
                <LinedButton type="button" style="lined" title="OLDEST" onClick={() => setSortNumByDate(1)} className={sortNumByDate === 1 ? 'clicked' : ''} />
                <br />
                <SortData post={post} data={data} catName={catName} setSortedDataByCat={setSortedDataByCat} buttonStyle="filled"></SortData>
              </SortStyle>
            </OpenContents>
          )}
        </ContentsStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default PostList
