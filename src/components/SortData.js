import { useEffect, useRef, useState, useContext, createContext } from 'react';
import LinedButton from '~/components/LinedButton';

import Cat from '~/data/Categories'

const PostList = ({ data, dataCat, catName, setSortedDataByCat, buttonStyle }) => {
  const [ sortNum, setSortNum ] = useState([]);
  
  const categoryList = Object.values(Cat[catName]);
  const eachCatLength = Object.keys(Cat[catName])
    .map(key => data.map(el => el[dataCat].includes(parseInt(key)))
      .filter(el => el === true).length
    )

  const getSortNum = (num) => {
    const hasCategoryNumber = sortNum.includes(num);
    setSortNum(prev => {
      const numArray = hasCategoryNumber 
        ? [...prev.filter(el => el !== num)]
        : [...prev, num]

      return numArray
    })
  }

  useEffect(() => {
    setSortedDataByCat(prev => {
      const dataArray = sortNum.length > 0
        ? prev > 0
          ? prev.filter(el => sortNum.every(num => el[dataCat].includes(num)))
          : data.filter(el => sortNum.every(num => el[dataCat].includes(num)))
        : data;

      return dataArray;
    })
  }, [sortNum]);

  return (
    <>
      <LinedButton type='button' style={buttonStyle} title='ALL' onClick={() => setSortNum([])} className={sortNum.length === 0 ? 'clicked' : ''}>
        <span className='button-num'>{data.length}</span>
      </LinedButton>
      {categoryList.map((el, idx) => (
        // eachCatLength[idx] > 0 &&
        <LinedButton key={idx} type='button' style={buttonStyle} title={el} onClick={() => getSortNum(idx)} className={sortNum.includes(idx) ? 'clicked' : ''}>
          <span className='button-num'>{eachCatLength[idx]}</span>
        </LinedButton>
      ))}
    </>
  )
}

export default PostList;