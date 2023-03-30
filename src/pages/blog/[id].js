import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LinedButton from '~/components/LinedButton'
import ColorContext from '~/store/ColorContext'

import { getAllPostIds, getPostData, getAllMetaData } from '~/lib/getPost'
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
`

const PostButtonStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
  .lined-text {
    font-family: 'cafe';
    font-size: 22px;
    font-weight: bold;
    line-height: 1.5;
  }
  .title {
    font-size: 12px;
    font-weight: bold;
    margin-top: -3px;
  }
  .next {
    text-align: right;
  }
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
  const allPostsData = getAllMetaData('blog')
  const currPostsIndex = allPostsData.findIndex((el) => el.id === params.id)
  const allPostsIds = allPostsData.map((el) => el.id)

  return {
    props: {
      blogData,
      allPostsIds,
      allPostsData,
      currPostsIndex,
    },
  }
}

const BlogDetail = ({ blogData, allPostsIds, allPostsData, currPostsIndex }) => {
  const [startDate] = useDate(blogData.date)
  // console.log('allPostsData', allPostsData)

  return (
    <ColorContext.Consumer>
      {(color) => (
        <BlogStyle>
          <FilledTitle title={blogData.title} fontSize="50px" topGap="0px" lineHeight="1.5" />
          <InfoStyle color={color.currColor.color}>
            <div className="date">{startDate.ko}</div>
            {blogData.tech.map((cat, idx) => (
              <LinedButton key={idx} type="link" href={`/blog?tag=${cat}`} style="filled" title={`#${Cat.tech[cat]}`}></LinedButton>
            ))}
          </InfoStyle>
          <MarkdownStyle>
            <div dangerouslySetInnerHTML={{ __html: blogData.contentHtml }} />
          </MarkdownStyle>
          <PostButtonStyle>
            <div className="prev">
              {currPostsIndex > 0 && (
                <Link href={`/blog/${allPostsData[currPostsIndex - 1].id}`}>
                  <LinedButton style="filled" title="이전 글" direction="left">
                    <div className="title">{allPostsData[currPostsIndex - 1].title}</div>
                  </LinedButton>
                </Link>
              )}
            </div>
            <div className="next">
              {currPostsIndex < allPostsData.length - 1 && (
                <Link href={`/blog/${allPostsData[currPostsIndex + 1].id}`}>
                  <LinedButton style="filled" title="다음 글">
                    <div className="title">{allPostsData[currPostsIndex + 1].title}</div>
                  </LinedButton>
                </Link>
              )}
            </div>
          </PostButtonStyle>
          <Comments></Comments>
          <TableOfContents toc={blogData.toc} />
        </BlogStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default BlogDetail
