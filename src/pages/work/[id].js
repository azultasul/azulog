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
import Vars from '~/data/Variables'
import Cat from '~/data/Categories'
import styled from 'styled-components'

const TitleStyle = styled.div`
  max-width: ${Vars.sizes.l}px;
  margin: 0 auto;
  .title {
    padding: 110px 160px 45px;
    &-wrap {
      border-bottom: ${(props) => `1px solid ${props.color}`};
    }
  }
`
const InfoStyle = styled.div`
  max-width: 800px;
  margin: 44px auto 0;

  text-align: right;
  .date {
    font-size: 15px;
  }
  .lined-text {
    font-size: 20px;
    font-weight: 700;
    margin-left: 12px;
    line-height: 1.3;
  }
`

export async function getStaticPaths() {
  const paths = getAllPostIds('work')

  return {
    paths,
    fallback: false,
  }
}

// `getStaticPaths` requires using `getStaticProps`}
export async function getStaticProps({ params }) {
  const workData = await getPostData('work', params.id)

  return {
    props: {
      workData,
    },
  }
}

const WorkDetail = ({ workData }) => {
  // console.log("workData",workData);

  return (
    <ColorContext.Consumer>
      {(color) => (
        <>
          <TitleStyle color={color.currColor.color}>
            <FilledTitle title={workData.title} fontSize="50px" topGap="0px" lineHeight="1.5" />
          </TitleStyle>
          <InfoStyle>
            <div className="date">{workData.date}</div>
            {workData.category.map((cat, idx) => (
              // <Link href={`/work?tag=${cat}`} key={idx}>{Cat.techStack[cat]}</Link>
              <LinedButton key={idx} type="link" href={`/work?tag=${cat}`} style="filled" title={`#${Cat.techStack[cat]}`}></LinedButton>
            ))}
          </InfoStyle>
          <MarkdownStyle>
            <div dangerouslySetInnerHTML={{ __html: workData.contentHtml }} />
          </MarkdownStyle>
          <Comments></Comments>
          <TableOfContents toc={workData.toc} />
        </>
      )}
    </ColorContext.Consumer>
  )
}

export default WorkDetail
