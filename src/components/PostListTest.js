import Link from 'next/link';
import { useEffect, useRef, useState, useContext, createContext } from 'react';
import LinedButton from '~/components/LinedButton';
import PostCard from '~/components/PostCard';
import SortData from '~/components/SortData';

import Vars from "~/data/Variables"
import Cat from '~/data/Categories'
import styled from  'styled-components';
import ColorContext from "~/store/ColorContext";

const ContentsStyle = styled.div`
  display: flex;
  // gap: ${Vars.gap}px;
  gap: 44px;
  height: ${props => `calc(100vh - ${props.frameTotalH}px)`};
  overflow: scroll;
  list-style: none;
  .card {
    &-wrap {
      flex: 2.3;
      padding-left: ${props => `${props.contentsMargin + 32}px`};
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
  text-align: right;
  padding-right: ${props => `${props.contentsMargin}px`};
  .lined-button {
    position: relative;
    font-family: 'cafe';
    font-size: 30px;
    font-weight: bold;
    // margin: 0 20px;
    margin: 6px 12px;
    line-height: 1.3;
  }
  .button-num {
    position: absolute;
    right: -2px;
    bottom: 5.8px;
    transform: translate(100%, 0px);
    font-size: 8px;
  }
`

const PostList = ({ data, frameTotalH }) => {
  const contentsRef = useRef(null);
  const [ contentsMargin, setContentsMargin ] = useState(0);

  const [ sortNumByDate, setSortNumByDate ] = useState(0);
  const [ sortedDataByCat, setSortedDataByCat ] = useState(data);
  const [ sortedData, setSortedData ] = useState(data);
  

  const sortDataByDate = (array) => {
    const sortedDataByDate = sortNumByDate === 0
      ? array.sort((a, b) => new Date(b.date) - new Date(a.date)) // 내림차순
      : array.sort((a, b) => new Date(a.date) - new Date(b.date)) // 오름차순

      console.log("???", array, sortedDataByDate);

    return sortedDataByDate;
  }
  // const [ sortedData, setSortedData ] = useState(sortDataByDate(data));


  useEffect(() => {
    console.log("data", sortedData);
  }, [sortedData])

  useEffect(() => {
    setSortedData(sortDataByDate(sortedDataByCat))
  }, [sortedDataByCat])

  useEffect(() => {
    setSortedData(prev => sortDataByDate(prev));
  }, [sortNumByDate])

  const resizeHandler = () => {
    const contentsW = contentsRef.current.clientWidth;
    setContentsMargin(contentsW > 1400 ? (contentsW - 1400)/2 : 0);
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', () => {
      resizeHandler();
    })
  }, []);

  return (
    <ColorContext.Consumer>
      {color => (
        <ContentsStyle ref={contentsRef} frameTotalH={frameTotalH} contentsMargin={contentsMargin}>
          <div className='card-wrap'>
            <div className="card-inner">
              {sortedData.map(({ id, date, title, thumb, category }) => {
                const catName = category.map(el => Cat.techStack[el])
                return (
                  <PostCard title={title} href={`/blog/${id}`} date={date} thumb={thumb} category={catName} key={id}></PostCard>
                )
              })}
            </div>
          </div>
          <SortStyle color={color.currColor.color} contentsMargin={contentsMargin}>
            <LinedButton type='button' style='lined' title='NEWEST' onClick={() => setSortNumByDate(0)} className={sortNumByDate === 0 ? 'clicked' : ''}/>
            <LinedButton type='button' style='lined' title='OLDEST' onClick={() => setSortNumByDate(1)} className={sortNumByDate === 1 ? 'clicked' : ''}/>
            <br />
            <SortData data={data} dataCat='category' catName='techStack' setSortedDataByCat={setSortedDataByCat} buttonStyle='filled'></SortData>
          </SortStyle>
        </ContentsStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default PostList;