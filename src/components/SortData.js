import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import LinedButton from '~/components/LinedButton'

import Cat from '~/data/Categories'
import styled from 'styled-components'

const SortStyle = styled.div`
  text-transform: uppercase;
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
      let sortedId = {}
      catName.forEach((name, idx) => {
        const dataArray =
          sortNum[name]?.length > 0
            ? prev > 0
              ? prev.filter((el) => sortNum[name].every((num) => el[name]?.includes(parseInt(num))))
              : data.filter((el) => sortNum[name].every((num) => el[name]?.includes(parseInt(num))))
            : data

        sortedId[name] = dataArray.map((el) => el.id)
      })

      let ids
      catName.forEach((name, idx) => {
        if (idx < catName.length - 1) {
          ids = sortedId[name].filter((el) => sortedId[catName[idx + 1]].includes(el)) // returns [1, 2]
        }
      })
      console.log('ids', ids)
      return ids
    })
  }, [sortNum])

  return (
    <SortStyle>
      {catName.map((name, idx) => (
        <div key={idx}>
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
        </div>
      ))}
    </SortStyle>
  )
}

export default SortData
