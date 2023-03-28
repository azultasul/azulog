import { useEffect, useRef, useState, useContext, createContext } from 'react'
import FilledTitle from '~/components/FilledTitle'
import PostList from '~/components/PostList'

import Vars from '~/data/Variables'
import Works from '~/data/Works'
import styled from 'styled-components'

const PageStyle = styled.div`
  margin-top: ${(props) => `${props.titleTotalH}px`};
`

const WorkList = () => {
  const titleRef = useRef(null)
  const [titleTotalH, setTitleTotalH] = useState(null)
  const [frameTotalH, setFrameTotalH] = useState(null)

  useEffect(() => {
    const titleH = titleRef.current.offsetHeight
    const frameGap = Vars.frameTop + 38
    setTitleTotalH(titleH + 38)
    setFrameTotalH(titleH + frameGap)
  }, [])

  return (
    <PageStyle titleTotalH={titleTotalH}>
      <FilledTitle ref={titleRef} type="lined" title="WORK" position="fixed" top={`${Vars.frameTop}px`} left="50%" fontSize="150px" topGap="20px" lineHeight="1" />
      <PostList post="work" data={Works} frameTotalH={frameTotalH} dataCat="category" catName="techStack" />
    </PageStyle>
  )
}

export default WorkList
