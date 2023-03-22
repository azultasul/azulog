import Link from 'next/link';
import { useEffect, useRef, useState, useContext, createContext } from 'react';
import LinedButton from '~/components/LinedButton';
import PostCard from '~/components/PostCard';

import Vars from "~/data/Variables"
import styled from  'styled-components';
import ColorContext from "~/store/ColorContext";

const ContentsStyle = styled.div`
  display: flex;
  // gap: ${Vars.gap}px;
  gap: 44px;
  height: ${props => `calc(100vh - ${props.frameTotalH}px)`};
  overflow: scroll;
  list-style: none;
  .card {
    &-wrap {
      flex: 2.3;
      padding-left: ${props => `${props.contentsMargin + 32}px`};
    }
    &-inner {
      padding-bottom: ${Vars.frame}px;
    }
  }
`

const SortStyle = styled.div`
  flex: 1;
  position: sticky;
  top: 0;
  right: 0;
  text-align: right;
  padding-right: ${props => `${props.contentsMargin}px`};
  .lined-button {
    font-family: 'cafe';
    font-size: 30px;
    font-weight: bold;
    // margin: 0 20px;
    margin: 6px 12px;
    line-height: 1.3;
  }
`

const BlogList = ({ data, frameTotalH, sortList }) => {
  const contentsRef = useRef(null);
  const [ contentsMargin, setContentsMargin ] = useState(0);

  const resizeHandler = () => {
    const contentsW = contentsRef.current.clientWidth;
    setContentsMargin(contentsW > 1400 ? (contentsW - 1400)/2 : 0);
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', () => {
      resizeHandler();
    })
  }, []);

  return (
    <ColorContext.Consumer>
      {color => (
        <ContentsStyle ref={contentsRef} frameTotalH={frameTotalH} contentsMargin={contentsMargin}>
          <div className='card-wrap'>
            <div className="card-inner">
              {data.map(({ id, date, title, thumb, category }) => (
                <PostCard title={title} href={`/blog/${id}`} date={date} thumb={thumb} category={category} key={id}></PostCard>
              ))}
            </div>
          </div>
          <SortStyle color={color.currColor.color} contentsMargin={contentsMargin}>
            <LinedButton type='button' style='lined' title='NEWEST' />
            <LinedButton type='button' style='lined' title='OLDEST' />
            <br />
            {sortList.map((el, idx) => <LinedButton key={idx} type='button' style='filled' title={el} />)}
          </SortStyle>
        </ContentsStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default BlogList;