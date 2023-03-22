import Link from 'next/link';
import { useEffect, useRef, useState, useContext, createContext } from 'react';
import FilledTitle from '~/components/FilledTitle';
import PostList from '~/components/PostList';

import Vars from "~/data/Variables"
import PostData from '~/data/PostData'
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

const PageStyle = styled.div`
  margin-top: ${props => `${props.titleTotalH}px`};
`

const BlogList = ({ allPostsData }) => {
  const titleRef = useRef(null);
  const [ titleTotalH, setTitleTotalH ] = useState(null);
  const [ frameTotalH, setFrameTotalH ] = useState(null);

  useEffect(() => {
    const titleH = titleRef.current.offsetHeight;
    const frameGap = Vars.frameTop + 38;
    setTitleTotalH(titleH + 38);
    setFrameTotalH(titleH + frameGap);
  }, []);

  return (
    <PageStyle titleTotalH={titleTotalH}>
      <FilledTitle ref={titleRef} type='lined' title='BLOG' position='fixed' top={`${Vars.frameTop}px`} left='50%' fontSize='170px' topGap='20px' lineHeight='1'/>
      <PostList data={allPostsData} frameTotalH={frameTotalH} sortList={Object.values(PostData.techStack)}/>
    </PageStyle>
  )
}

export default BlogList;