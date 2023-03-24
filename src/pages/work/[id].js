import { getAllPostIds, getPostData } from '~/lib/getPost'
import MarkdownStyle from '~/styles/MarkdownStyle'
import FilledTitle from '~/components/FilledTitle'
import TableOfContents from '~/components/TableOfContents'
import Vars from '~/data/Variables'
import styled from 'styled-components'

const TitleStyle = styled.div`
  max-width: ${Vars.sizes.l}px;
  margin: 0 auto;
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
    <>
      <TitleStyle>
        <FilledTitle title={workData.title} fontSize="80px" topGap="20px" />
      </TitleStyle>
      <MarkdownStyle>
        <div dangerouslySetInnerHTML={{ __html: workData.contentHtml }} />
      </MarkdownStyle>
      <TableOfContents toc={workData.toc} />
    </>
  )
}

export default WorkDetail
