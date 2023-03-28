import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LinedButton from '~/components/LinedButton'
import ColorContext from '~/store/ColorContext'

import { getAllPostIds, getPostData } from '~/lib/getPost'
import MarkdownStyle from '~/styles/MarkdownStyle'
import FilledTitle from '~/components/FilledTitle'
import TableOfContents from '~/components/TableOfContents'
import Comments from '~/components/Comments'
import useDate from '~/utils/useDate'
import Vars from '~/data/Variables'
import Cat from '~/data/Categories'
import styled from 'styled-components'

const BlogStyle = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-top: 90px;
`

const InfoStyle = styled.div`
  margin: 30px auto 0px;
  text-align: right;
  width: 55%;
  margin: 0 0 0 auto;

  .date {
    font-size: 15px;
    font-weight: 500;
  }
  .lined-text {
    font-size: 20px;
    font-weight: 700;
    margin-left: 12px;
    line-height: 1.3;
  }
  // .divider {
  //   width: 40px;
  //   height: 3px;
  //   margin: 20px auto 0px;
  //   opacity: 0.9;
  //   background: ${(props) => props.color};
  // }
`

export async function getStaticPaths() {
  const paths = getAllPostIds('blog')

  return {
    paths,
    fallback: false,
  }
}

// `getStaticPaths` requires using `getStaticProps`}
export async function getStaticProps({ params }) {
  const blogData = await getPostData('blog', params.id)

  return {
    props: {
      blogData,
    },
  }
}

const BlogDetail = ({ blogData }) => {
  const [startDate] = useDate(blogData.date)
  console.log('blogData', blogData.contentHtml)

  return (
    <ColorContext.Consumer>
      {(color) => (
        <BlogStyle>
          <FilledTitle title={blogData.title} fontSize="50px" topGap="0px" lineHeight="1.5" />
          <InfoStyle color={color.currColor.color}>
            {/* <div className="divider"></div> */}
            <div className="date">{startDate.ko}</div>
            {blogData.category.map((cat, idx) => (
              // <Link href={`/blog?tag=${cat}`} key={idx}>{Cat.techStack[cat]}</Link>
              <LinedButton key={idx} type="link" href={`/blog?tag=${cat}`} style="filled" title={`#${Cat.techStack[cat]}`}></LinedButton>
            ))}
          </InfoStyle>
          <MarkdownStyle>
            <div dangerouslySetInnerHTML={{ __html: blogData.contentHtml }} />
          </MarkdownStyle>
          <Comments></Comments>
          <TableOfContents toc={blogData.toc} />
        </BlogStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default BlogDetail
