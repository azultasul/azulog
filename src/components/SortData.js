import { useEffect, useRef, useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router'
import LinedButton from '~/components/LinedButton';

import Cat from '~/data/Categories'

const PostList = ({ post, data, dataCat, catName, setSortedDataByCat, buttonStyle }) => {
  const [ sortNum, setSortNum ] = useState([]);
  const router = useRouter()
  
  const categoryList = Object.values(Cat[catName]);
  const eachCatLength = Object.keys(Cat[catName])
    .map(key => data.map(el => el[dataCat].includes(parseInt(key)))
      .filter(el => el === true).length
    )

  const getSortNum = (prev, num) => {
    const hasCategoryNumber = sortNum.includes(`${num}`);

    const numArray = hasCategoryNumber 
      ? [...prev.filter(el => el !== `${num}`)]
      : [...prev, `${num}`]

    return numArray;
  }

  useEffect(() => {
    setSortNum(router.query.tag?.length > 0 ? [...router.query.tag.split(',')] : []);
  }, [router.query.tag])

  useEffect(() => {
    setSortedDataByCat(prev => {
      const dataArray = sortNum.length > 0
        ? prev > 0
          ? prev.filter(el => sortNum.every(num => el[dataCat].includes(parseInt(num))))
          : data.filter(el => sortNum.every(num => el[dataCat].includes(parseInt(num))))
        : data;

      return dataArray;
    })
  }, [sortNum]);

  return (
    <>
      <LinedButton type='link' href={`/${post}`} style={buttonStyle} title='ALL' className={sortNum.length === 0 ? 'clicked' : ''}>
        <span className='button-num'>{data.length}</span>
      </LinedButton>
      {categoryList.map((el, idx) => (
        // eachCatLength[idx] > 0 &&
        <LinedButton key={idx} type='link' href={`/${post}?tag=${getSortNum(sortNum, idx).join(',')}`} style={buttonStyle} title={el} className={sortNum.includes(`${idx}`) ? 'clicked' : ''}>
          <span className='button-num'>{eachCatLength[idx]}</span>
        </LinedButton>
      ))}
    </>
  )
}

export default PostList;