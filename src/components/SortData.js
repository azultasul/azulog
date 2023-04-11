import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import LinedButton from '~/components/LinedButton'

import Vars from '~/data/Variables'
import Cat from '~/data/Categories'
import styled from 'styled-components'

const SortStyle = styled.div`
  text-transform: uppercase;
  .category {
    display: inline-block;
    position: relative;
    margin-top: 18px;
    margin-right: 5px;
    padding: 0px 2px;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.2;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 6px;
      bottom: 0;
      right: 0;
      transform: skew(-15deg);
      background: #3d88ed;
      opacity: 0.5;
      z-index: -1;
    }
  }
  .button-num {
    position: absolute;
    right: -2px;
    bottom: 5.8px;
    transform: translate(100%, 0px);
    font-size: 8px;
    ${Vars.media.md`
      right: -1px;
      bottom: 2.5px;
    `}
  }
`

const SortData = ({ post, data, catName, setSortedDataByCat }) => {
  const [sortNum, setSortNum] = useState({})
  const router = useRouter()

  const [categoryList, setCategoryList] = useState({})
  const [eachCatLength, setEachCatLength] = useState({})

  const getSortNum = (prev, name, num) => {
    if (num < 0) {
      return []
    } else {
      const hasCategoryNumber = sortNum[name].includes(`${num}`)

      const numArray = hasCategoryNumber ? [...prev[name].filter((el) => el !== `${num}`)] : [...prev[name], `${num}`]

      return numArray.join(',')
    }
  }

  const getHref = (prev, name, num) => {
    let href = `/${post}?`
    catName.forEach((cname, idx) => {
      href = href + `${cname}=${cname === name ? getSortNum(prev, name, num) : prev[cname]}${idx < catName.length - 1 ? '&' : ''}`
    })
    return href
  }

  useEffect(() => {
    // init category list, length
    setCategoryList((prev) => {
      const obj = catName.forEach((name) => {
        categoryList[name] = Object.values(Cat[name])
      })

      return { ...prev, ...obj }
    })
    setEachCatLength((prev) => {
      const obj = catName.forEach((name) => {
        eachCatLength[name] = Object.keys(Cat[name]).map((key) => data.map((el) => el[name].includes(parseInt(key))).filter((el) => el === true).length)
      })

      return { ...prev, ...obj }
    })
  }, [])

  useEffect(() => {
    setSortNum((prev) => {
      const obj = {}
      catName.forEach((name) => {
        obj[name] = router.query[name]?.length > 0 ? [...router.query[name].split(',')] : []
      })

      return { ...prev, ...obj }
    })
  }, [router.query])

  useEffect(() => {
    setSortedDataByCat((prev) => {
      const isAll = !catName.some((name) => sortNum[name]?.length > 0)
      let dataArray

      isAll // catName sortNum배열 길이가 모두 0
        ? (dataArray = data) // data 전체 return
        : catName.forEach((name, idx) => {
            if (idx === 0) {
              dataArray =
                prev > 0 ? prev.filter((el) => sortNum[name].every((num) => el[name].includes(parseInt(num)))) : data.filter((el) => sortNum[name].every((num) => el[name]?.includes(parseInt(num))))
            } else {
              dataArray = dataArray.length > 0 ? dataArray.filter((el) => sortNum[name].every((num) => el[name].includes(parseInt(num)))) : []
            }
          })

      return dataArray
    })
  }, [sortNum])

  return (
    <>
      {catName.map((name, idx) => (
        <SortStyle key={idx}>
          <span className="category">{Cat.krName[name]}</span>
          <br />
          <LinedButton type="link" href={getHref(sortNum, name, -1)} style={idx % 2 === 0 ? 'filled' : 'lined'} title="ALL" className={sortNum[name]?.length === 0 ? 'clicked' : ''}>
            <span className="button-num">{data.length}</span>
          </LinedButton>
          {categoryList[name]?.map(
            (el, _idx) =>
              eachCatLength[name][_idx] > 0 && (
                <LinedButton
                  key={_idx}
                  type="link"
                  href={getHref(sortNum, name, _idx)}
                  style={idx % 2 === 0 ? 'filled' : 'lined'}
                  title={el}
                  className={sortNum[name].includes(`${_idx}`) ? 'clicked' : ''}
                >
                  <span className="button-num">{eachCatLength[name][_idx]}</span>
                </LinedButton>
              )
          )}
        </SortStyle>
      ))}
    </>
  )
}

export default SortData
