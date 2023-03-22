import Link from 'next/link';
import Image from 'next/image'
import Date from '~/components/Date';
import LinedButton from '~/components/LinedButton';
import Vars from "~/data/Variables"
import styled from  'styled-components';
import ColorContext from "~/store/ColorContext";

const CardWrapStyle = styled.div`
  // width: calc(50% - 8px);
  margin-top: 18px;
  &:first-child {
    margin-top: 0px;
  }
`
const CardStyle = styled.div`
  display: flex;
  width: 100%;
  min-height: 120px;
  border-radius: 18px;
  border: ${props => `1px solid ${props.color}`};
  overflow: hidden;
  .image {
    position: relative;
    max-width: 200px;
    min-width: 110px;
    flex: 1;
    border-right: ${props => `1px solid ${props.color}`};
    overflow: hidden;
  }
  .thumb {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.2s;
  }
  &:hover {
    .thumb {
      transform: translate(-50%, -50%) scale(1.1);
    }
    .title {
      color: transparent;
      -webkit-text-stroke: ${props => `1px ${props.color}`};
    }
  }
`
const ContentsStyle = styled.div`
  flex: 3;
  padding: 18px;
  .title {
    font-family: 'cafe';
    font-size: 28px;
    font-weight: bold;
    line-height: 1.5;
  }
  .date {
    font-size: 13px;
    font-weight: 400;
  }
  .category {
    font-size: 15px;
    font-weight: 400;
    text-align: right;
    line-height: 1;
    span {
      // background: gray;
      // border-radius: 8px;

      background: ${props => props.color};
      border-radius: 16px;
      padding: 4px 13px;
      margin-left: 6px;
      color: ${Vars.backColor};
    }
  }
`

const PostCard = ({ title, href, date, thumb, category, className }) => {

  return (
    <ColorContext.Consumer>
      {color => (
        <CardWrapStyle>
          <Link href={href}>
            <CardStyle color={color.currColor.color}>
              {thumb && 
                <div className="image">
                  <Image src={thumb} className='thumb' alt="alt" width='100' height='100' />
                </div>
              }
              <ContentsStyle color={color.currColor.color}>
                <div className='title'>{title}</div>
                <Date className='date' dateString={date} />
                <div className="category">{category.map((el, idx) => <span key={idx}>{el}</span>)}</div>
              </ContentsStyle>
            </CardStyle>
          </Link>
        </CardWrapStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default PostCard;