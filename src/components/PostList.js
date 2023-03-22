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
  const [ sortNumByDate, setSortNumByDate ] = useState(0);
  const [ sortNumByCategory, setSortNumByCategory ] = useState([]);

  // const [ sortedDataByDate, setSortedDataByDate ] = useState(sortedDataByCategory);
  const [ sortedDataByCategory, setSortedDataByCategory ] = useState(data);
  const categoryList = Object.values(PostData.techStack);


  // const getSortNumByDate = (num) => {
  //   const sortedData = num === 0
  //     ? data.sort((a, b) => new Date(a.date) - new Date(b.date))
  //     : data.sort((a, b) => new Date(b.date) - new Date(a.date))
  // }

  const getSortNumByCategory = (el) => {
    const hasCategoryNumber = sortNumByCategory.includes(el);
    setSortNumByCategory(prev => {
      const data = hasCategoryNumber 
        ? [...prev.filter(num => num !== el)]
        : [...prev, el]

      return data
    })
  }


  useEffect(() => {
    console.log("??", sortNumByCategory);

    setSortedDataByCategory(prev => {
      const test = sortNumByCategory.length > 0
        ? prev.filter(el => el.category.every(el2 => sortNumByCategory.includes(el2)))
        // ? prev.filter(el =>  console.log("data", sortNumByCategory.every(el2 => el.category.includes(el2))))
        : data

      return test;
    })

  }, [sortNumByCategory]);

  useEffect(() => {
    // console.log(sortedDataByCategory);
  }, [sortedDataByCategory])

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
              {data.map(({ id, date, title, thumb, category }) => {
                const cat = category.map(el => PostData.techStack[el])
                return (
                  <PostCard title={title} href={`/blog/${id}`} date={date} thumb={thumb} category={cat} key={id}></PostCard>
                )
              })}
            </div>
          </div>
          <SortStyle color={color.currColor.color} contentsMargin={contentsMargin}>
            <LinedButton type='button' style='lined' title='NEWEST' onClick={() => setSortNumByDate(0)} />
            <LinedButton type='button' style='lined' title='OLDEST' onClick={() => setSortNumByDate(1)} />
            <br />
            {categoryList.map((el, idx) => (
              <LinedButton key={idx} type='button' style='filled' title={el} onClick={() => getSortNumByCategory(idx)}>
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