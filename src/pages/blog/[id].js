// import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '~/lib/getPost';

export async function getStaticPaths() {
  const paths = getAllPostIds('blog');

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
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

  return (
    <>
      {blogData.title}
      <br />
      {blogData.id}
      <br />
      {blogData.date}
      <div dangerouslySetInnerHTML={{ __html: blogData.contentHtml }} />
    </>
  );
}

export default BlogDetail;