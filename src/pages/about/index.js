import { useEffect, useRef, useState } from 'react'
import FilledTitle from '~/components/FilledTitle'

import Vars from '~/data/Variables'
import styled from 'styled-components'

const PageStyle = styled.div`
  margin-top: ${(props) => `${props.titleTotalH}px`};
`

const WorkList = ({ allPostsData }) => {
  const titleRef = useRef(null)
  const [titleTotalH, setTitleTotalH] = useState(null)

  useEffect(() => {
    const titleH = titleRef.current.offsetHeight
    setTitleTotalH(titleH + 38)
  }, [])

  return (
    <PageStyle titleTotalH={titleTotalH}>
      <FilledTitle ref={titleRef} type="lined" title="ABOUT" position="fixed" top={`${Vars.frameTop}px`} left="50%" fontSize="170px" topGap="20px" lineHeight="1" />
    </PageStyle>
  )
}

export default WorkList
