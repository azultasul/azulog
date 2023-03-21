import Link from 'next/link';
import FilledTitle from '~/components/FilledTitle';
import LinedButton from '~/components/LinedButton';
import PostCard from '~/components/PostCard';

import Vars from "~/styles/Variables"
import styled from  'styled-components';
import { getAllMetaData } from '~/lib/getPost';
import ColorContext from "~/store/ColorContext";

export async function getStaticProps() {
  const allPostsData = getAllMetaData('blog')
  return {
    props: {
      allPostsData
    }
  }
}


const PageStyle = styled.div`
margin-top: 292px;
`

const ContentsStyle = styled.div`
  display: flex;
  // flex-wrap: wrap;
  gap: ${Vars.gap};
  max-width: ${Vars.sizes.l}px;
  margin: 38px auto 0;
  list-style: none;
  padding: 0 32px;
  .card-wrap {
    max-width: 900px;
  }
`

const SortStyle = styled.div`
  flex: 1;
  // border-top: ${props => `1px solid ${props.color}`};
  margin: 0px;
  // padding-top: 20px;
  text-align: right;
  .lined-button {
    font-family: 'cafe';
    font-size: 30px;
    font-weight: bold;
    margin: 0 20px;
    line-height: 1.3;
  }
`

const sortList = ['React', 'Next.js', 'Vue', 'Javascript', 'CSS', 'Frontend', 'Github']

const BlogList = ({ allPostsData }) => {
  // console.log("allPostsData", allPostsData);

  return (
    <ColorContext.Consumer>
      {color => (
        <PageStyle>
          <FilledTitle type='lined' title='BLOG' position='fixed' top={Vars.frameTop} left='50%' fontSize='230px' topGap='20px' lineHeight='1'/>
          <ContentsStyle>
            <div className='card-wrap'>
              {allPostsData.map(({ id, date, title, thumb }) => (
                <PostCard title={title} href={`/blog/${id}`} date={date} thumb={thumb} key={id}></PostCard>
              ))}
            </div>
            <SortStyle color={color.currColor.color}>
              <LinedButton type='button' style='lined' title='NEWEST' />
              <LinedButton type='button' style='lined' title='OLDEST' />
              <br />
              {sortList.map((el, idx) => <LinedButton key={idx} type='button' style='filled' title={el} />)}
            </SortStyle>
          </ContentsStyle>
        </PageStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default BlogList;