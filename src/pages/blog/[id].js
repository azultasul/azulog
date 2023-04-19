import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LinedButton from '~/components/LinedButton'
import ColorContext from '~/store/ColorContext'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkHeadingId from 'remark-heading-id'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'

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
  padding-right: ${Vars.frame}px;
  padding-left: ${Vars.frame}px;
  ${Vars.media.md`
    padding-top: 50px;
  `};
`

const InfoStyle = styled.div`
  margin: 30px auto 0px;
  text-align: right;
  width: 55%;
  margin: 0 0 0 auto;

  .date {
    font-size: 15px;
    font-weight: 500;
    ${Vars.media.md`
      font-size: 14px;
      margin-top: 16px;
    `};
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
  gap: 20px;
  ${Vars.media.md`
    margin-top: 60px;
  `};
  .lined-text {
    font-family: 'cafe';
    font-size: 22px;
    font-weight: bold;
    line-height: 1.5;
  }
  ${Vars.media.md`
    font-size: 20px;
  `};
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
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

// `getStaticPaths` requires using `getStaticProps`}
export async function getStaticProps({ params }) {
  const blogData = await getPostData(params.id)
  const allPostsData = getAllMetaData()
  const currPostsIndex = allPostsData.findIndex((el) => el.id === params.id)

  return {
    props: {
      blogData,
      allPostsData,
      currPostsIndex,
    },
  }
}

const BlogDetail = ({ blogData, allPostsData, currPostsIndex }) => {
  const [startDate] = useDate(blogData.date)
  // console.log('allPostsData', allPostsData)

  useEffect(() => {
    document.body.dataset.pageName = 'detail'
  }, [])

  return (
    <ColorContext.Consumer>
      {(color) => (
        <BlogStyle>
          <FilledTitle title={blogData.title} fontSize={['50px', '34px']} topGap="0px" lineHeight="1.5" />
          <InfoStyle color={color.currColor.color}>
            <div className="date">{startDate.ko}</div>
            {blogData.tech.map((cat, idx) => (
              <LinedButton key={idx} type="link" href={`/blog?tech=${cat}`} style="filled" title={`#${Cat.tech[cat]}`}></LinedButton>
            ))}
          </InfoStyle>
          <MarkdownStyle>
            <ReactMarkdown
              children={blogData?.contentHtml}
              remarkPlugins={[remarkGfm, remarkHeadingId]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter language={match[1]} PreTag="div" {...props} style={oneLight}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props}>{children}</code>
                  )
                },
              }}
            />
          </MarkdownStyle>
          <PostButtonStyle>
            <div className="prev">
              {currPostsIndex > 0 && (
                <Link href={`/blog/${allPostsData[currPostsIndex - 1].id}`} scroll={false}>
                  <LinedButton style="filled" title="이전 글" direction="left">
                    <div className="title">{allPostsData[currPostsIndex - 1].title}</div>
                  </LinedButton>
                </Link>
              )}
            </div>
            <div className="next">
              {currPostsIndex < allPostsData.length - 1 && (
                <Link href={`/blog/${allPostsData[currPostsIndex + 1].id}`} scroll={false}>
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
