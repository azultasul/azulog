import Link from 'next/link';
import styled from  'styled-components';
import { getAllMetaData } from '~/lib/getPost';

export async function getStaticProps() {
  const allPostsData = getAllMetaData('blog')
  return {
    props: {
      allPostsData
    }
  }
}

const BlogList = ({ allPostsData }) => {
  // console.log("allPostsData", allPostsData);

  return (
    <>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/blog/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default BlogList;