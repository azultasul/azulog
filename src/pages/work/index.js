import { useEffect, useRef, useState } from 'react';
import FilledTitle from '~/components/FilledTitle';
import PostList from '~/components/PostList';

import Vars from "~/data/Variables"
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

const PageStyle = styled.div`
  margin-top: ${props => `${props.titleTotalH}px`};
`

const WorkList = ({ allPostsData }) => {
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
      <FilledTitle ref={titleRef} type='lined' title='WORK' position='fixed' top={`${Vars.frameTop}px`} left='50%' fontSize='170px' topGap='20px' lineHeight='1'/>
      <PostList data={allPostsData} frameTotalH={frameTotalH} dataCat='category' catName='techStack'/>
    </PageStyle>
  )
}

export default WorkList;