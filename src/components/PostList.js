import Link from 'next/link';
import { useEffect, useRef, useState, useContext, createContext } from 'react';
import LinedButton from '~/components/LinedButton';
import PostCard from '~/components/PostCard';

import Vars from "~/data/Variables"
import PostData from '~/data/PostData'
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

const BlogList = ({ data, frameTotalH }) => {
  const contentsRef = useRef(null);
  const [ contentsMargin, setContentsMargin ] = useState(0);
  const [ sortByDate, setSortByDate ] = useState(0);
  const [ sortByCategory, setSortByCategory ] = useState([]);

  // const [ sortedDataByDate, setSortedDataByDate ] = useState(sortedDataByCategory);
  // const [ sortedDataByCategory, setSortedDataByCategory ] = useState(data);
  const categoryList = Object.values(PostData.techStack);

  // sortByDate
  const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date))
  // const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date))

  const getSortByCategory = (el) => {
    const hasCategoryNumber = sortByCategory.includes(el);
    
    // console.log("????", hasCategoryNumber && sortByCategory.filter(num => num !== el));
    

    hasCategoryNumber 
    ? setSortByCategory(prev => [...prev.filter(num => num !== el)])
    : setSortByCategory(prev => [...prev, el])
  }
  const resizeHandler = () => {
    const contentsW = contentsRef.current.clientWidth;
    setContentsMargin(contentsW > 1400 ? (contentsW - 1400)/2 : 0);
  };

  // useEffect(() => {
    

  // }, [sortByDate]);

  useEffect(() => {
    console.log("??", sortByCategory);
    // setSortedDataByCategory(prev => {
    //   prev.map(el => el.category)
    // })

  }, [sortByCategory]);

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
              {data.map(({ id, date, title, thumb, category }) => {
                const cat = category.map(el => PostData.techStack[el])
                return (
                  <PostCard title={title} href={`/blog/${id}`} date={date} thumb={thumb} category={cat} key={id}></PostCard>
                )
              })}
            </div>
          </div>
          <SortStyle color={color.currColor.color} contentsMargin={contentsMargin}>
            <LinedButton type='button' style='lined' title='NEWEST' onClick={() => setSortByDate(0)} />
            <LinedButton type='button' style='lined' title='OLDEST' onClick={() => setSortByDate(1)} />
            <br />
            {categoryList.map((el, idx) => (
              <LinedButton key={idx} type='button' style='filled' title={el} onClick={() => getSortByCategory(idx)}>
                <span className='button-num'>0</span>
              </LinedButton>
            ))}
          </SortStyle>
        </ContentsStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default BlogList;