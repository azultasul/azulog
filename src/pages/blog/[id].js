// import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '~/lib/getPost';
import MarkdownStyle from '~/styles/MarkdownStyle';

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
    <MarkdownStyle>
      {/* {blogData.title}
      <br />
      {blogData.id}
      <br />
      {blogData.date} */}
      <div dangerouslySetInnerHTML={{ __html: blogData.contentHtml }} />
    </MarkdownStyle>
  );
}

export default BlogDetail;