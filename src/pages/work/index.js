import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { NextSeo } from 'next-seo'
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

  const NEXT_SEO = {
    canonical: 'https://azulog.vercel.app/work',
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: `https://azulog.vercel.app/work/`,
      title: '작업물 리스트~',
      site_name: 'Azulog',
      images: [
        {
          url: 'https://azulog.vercel.app/images/thumb/azulog.jpg',
          width: 400,
          height: 400,
          alt: '작업물 리스트 이미지',
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
    </>
  )
}

export default WorkList
