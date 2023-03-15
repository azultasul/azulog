import Link from 'next/link';
import styled from  'styled-components';
import { getAllMetaData } from '~/lib/getPost';

export async function getStaticProps() {
  const allPostsData = getAllMetaData('work')
  return {
    props: {
      allPostsData
    }
  }
}

const WorkList = ({ allPostsData }) => {
  // console.log("allPostsData", allPostsData);

  return (
    <>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/work/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default WorkList;