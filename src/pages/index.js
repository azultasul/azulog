import { useState, useEffect } from 'react'
import Link from 'next/link'
import Falling from '~/components/Falling'
import FilledTitle from '~/components/FilledTitle'
import Intro from '~/components/main/Intro'
import Marquee from '~/components/Marquee'
import styled from 'styled-components'

import ColorContext from '~/store/ColorContext'
import Works from '~/data/Works'
import { getAllMetaData } from '~/lib/getPost'

const MainStyle = styled.section`
  width: 100%;
  overflow: hidden;
`
const AboutStyle = styled.section`
  height: 100vh;
`
const BlogStyle = styled.section``
const WorkStyle = styled.section``

export async function getStaticProps() {
  const latestBlogData = getAllMetaData()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
  return {
    props: {
      latestBlogData,
    },
  }
}
const Home = ({ latestBlogData }) => {
  useEffect(() => {
    document.body.dataset.pageName = 'home'
  }, [])

  return (
    <ColorContext.Consumer>
      {(color) => (
        <MainStyle>
          <Intro></Intro>
          <AboutStyle className="c-container">
            <div>
              <div>Frontend</div>
              <div>Developer</div>
              <div>DASOL's blog</div>
            </div>
          </AboutStyle>
          <BlogStyle>
            {latestBlogData.map((blog, index) => (
              <Link href={`/blog/${blog.id}`} key={index} scroll={false}>
                {blog.title}
              </Link>
            ))}
          </BlogStyle>
          <WorkStyle>
            {Works.filter((el) => el.star).map((work, index) => (
              <Link href={`/work/${work.id}`} key={index} scroll={false}>
                {work.title}
              </Link>
            ))}
          </WorkStyle>
        </MainStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default Home
