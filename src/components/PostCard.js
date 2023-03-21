import Link from 'next/link';
import Image from 'next/image'
import Date from '~/components/Date';
import LinedButton from '~/components/LinedButton';
import Vars from "~/styles/Variables"
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
  .contents {
    flex: 3;
    padding: 18px;
  }
  .title {
    font-family: 'cafe';
    font-size: 30px;
    font-weight: bold;
    line-height: 1.5;
    // transition: 0.2s;
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

const PostCard = ({ title, href, date, thumb, className }) => {

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
              <div className="contents">
                <div className='title'>{title}</div>
                <Date dateString={date} />
              </div>
            </CardStyle>
          </Link>
        </CardWrapStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default PostCard;