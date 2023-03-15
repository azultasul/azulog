// import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '~/lib/getPost';
import MarkdownStyle from '~/styles/MarkdownStyle';

export async function getStaticPaths() {
  const paths = getAllPostIds('work');

  return {
    paths,
    fallback: false,
  }
}

// `getStaticPaths` requires using `getStaticProps`}
export async function getStaticProps({ params }) {
  const workData = await getPostData('work', params.id);

  return {
    props: {
      workData,
    },
  };
}

const WorkDetail = ({ workData }) => {
  // console.log("workData",workData);

  return (
    <MarkdownStyle>
      {/* {workData.title}
      <br />
      {workData.id}
      <br />
      {workData.date} */}
      <div dangerouslySetInnerHTML={{ __html: workData.contentHtml }} />
    </MarkdownStyle>
  );
}

export default WorkDetail;