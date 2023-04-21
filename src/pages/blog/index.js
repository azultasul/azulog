import Link from 'next/link'
import { useEffect, useRef, useState, useContext, createContext } from 'react'
import FilledTitle from '~/components/FilledTitle'
import PostList from '~/components/PostList'

import Vars from '~/data/Variables'
import styled from 'styled-components'
import { getAllMetaData } from '~/lib/getPost'

export async function getStaticProps() {
  const allPostsData = getAllMetaData()
  return {
    props: {
      allPostsData,
    },
  }
}

const PageStyle = styled.div`
  margin-top: ${(props) => `${props.titleTotalH}px`};
`

const BlogList = ({ allPostsData }) => {
  const [titleTotalH, setTitleTotalH] = useState(null)

  useEffect(() => {
    document.body.dataset.pageName = 'list'
  }, [])

  return (
    <PageStyle titleTotalH={titleTotalH}>
      <FilledTitle
        type="lined"
        title="BLOG"
        position="fixed"
        top={`${Vars.frameTop}px`}
        left="50%"
        fontSize={['150px', '70px']}
        topGap="10px"
        lineHeight="1"
        setTitleTotalH={(el) => setTitleTotalH(el)}
        page="list"
      />
      <PostList post="blog" data={allPostsData} titleTotalH={titleTotalH} catName={['tech', 'series']} />
    </PageStyle>
  )
}

export default BlogList
