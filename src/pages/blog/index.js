import Link from 'next/link'
import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { NextSeo } from 'next-seo'
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

  const NEXT_SEO = {
    description: '아쑬로그 블로그 리스트',
    canonical: 'https://azulog.vercel.app/blog',
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: `https://azulog.vercel.app/blog`,
      title: 'Blog list',
      site_name: 'Azulog',
      images: [
        {
          url: 'https://azulog.vercel.app/images/thumb/azulog.jpg',
          width: 400,
          height: 400,
          alt: '블로그 리스트 이미지',
        },
      ],
    },
  }

  useEffect(() => {
    document.body.dataset.pageName = 'list'
  }, [])

  return (
    <>
      <NextSeo {...NEXT_SEO} />
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
    </>
  )
}

export default BlogList
