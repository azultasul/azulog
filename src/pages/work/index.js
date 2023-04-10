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
  const [titleTotalH, setTitleTotalH] = useState(null)

  useEffect(() => {
    document.body.dataset.pageName = 'list'
  }, [])

  return (
    <PageStyle titleTotalH={titleTotalH}>
      <FilledTitle
        type="lined"
        title="WORK"
        position="fixed"
        top={`${Vars.frameTop}px`}
        left="50%"
        fontSize={['150px', '70px']}
        topGap="20px"
        lineHeight="1"
        setTitleTotalH={(el) => setTitleTotalH(el)}
        page="list"
      />
      <PostList post="work" data={Works} titleTotalH={titleTotalH} catName={['tech', 'type']} />
    </PageStyle>
  )
}

export default WorkList
