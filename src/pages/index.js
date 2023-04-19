import { useState, useEffect } from 'react'
import Link from 'next/link'
import Falling from '~/components/Falling'
import FilledTitle from '~/components/FilledTitle'
import styled from 'styled-components'

import ColorContext from '~/store/ColorContext'
import Works from '~/data/Works'
import { getAllMetaData } from '~/lib/getPost'

const IntroStyle = styled.section`
  width: 100%;
  height: 130vh;
  .back {
    font-family: 'chab';
    font-size: 120vh;
    line-height: 1;
    letter-spacing: -20vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-60%, -50%);
    z-index: -1;
    &--chang {
      font-family: 'chang';
    }
  }
  .text {
    &-wrap {
      font-family: 'cafe';
      font-size: 60px;
      font-weight: 700;

      // color: white;
      // -webkit-text-stroke: ${(props) => `1px ${props.color}`};
    }
  }
`
const AboutStyle = styled.section``
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
        <>
          <IntroStyle color={color.currColor.color}>
            <div className="text-wrap">
              <div className="text">AZULOG</div>
            </div>
          </IntroStyle>
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
        </>
      )}
    </ColorContext.Consumer>
  )
}

export default Home
