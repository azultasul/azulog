import { getAllPostIds, getPostData } from '~/lib/getPost';
import MarkdownStyle from '~/styles/MarkdownStyle';
import FilledTitle from '~/components/FilledTitle'
import TableOfContents from '~/components/TableOfContents'
import Comments from '~/components/Comments'
import Vars from "~/data/Variables"
import styled from  'styled-components';

const TitleStyle = styled.div`
  max-width: ${Vars.sizes.l}px;
  margin: 0 auto;
`

export async function getStaticPaths() {
  const paths = getAllPostIds('blog');

  return {
    paths,
    fallback: false,
  }
}

// `getStaticPaths` requires using `getStaticProps`}
export async function getStaticProps({ params }) {
  const blogData = await getPostData('blog', params.id);

  return {
    props: {
      blogData,
    },
  };
}

const BlogDetail = ({ blogData }) => {
  // console.log("blogData",blogData);

  return (
    <>
      <TitleStyle>
        <FilledTitle title={blogData.title} fontSize='80px' topGap='20px'/>
      </TitleStyle>
      <MarkdownStyle>
        {/* {blogData.title}
        <br />
        {blogData.id}
        <br />
        {blogData.date} */}
        <div dangerouslySetInnerHTML={{ __html: blogData.contentHtml }} />
      </MarkdownStyle>
      <Comments></Comments>
      <TableOfContents toc={blogData.toc} />
    </>
  );
}

export default BlogDetail;