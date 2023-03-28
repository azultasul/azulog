import Link from 'next/link'
import Image from 'next/image'
import Date from '~/components/Date'
import LinedButton from '~/components/LinedButton'
import useDate from '~/utils/useDate'
import Vars from '~/data/Variables'
import styled from 'styled-components'
import ColorContext from '~/store/ColorContext'

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
  // min-height: 120px;
  border-radius: 18px;
  border: ${(props) => `1px solid ${props.color}`};
  overflow: hidden;
  .image {
    position: relative;
    max-width: 200px;
    min-width: 110px;
    flex: 1;
    border-right: ${(props) => `1px solid ${props.color}`};
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
      -webkit-text-stroke: ${(props) => `1px ${props.color}`};
    }
  }
`
const ContentsStyle = styled.div`
  flex: 3;
  padding: 18px;
  .title {
    font-family: 'cafe';
    font-size: 22px;
    font-weight: bold;
    line-height: 1.5;
  }
  .date {
    font-size: 14px;
    font-weight: 400;
  }
  .desc {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
  }
  .category {
    font-size: 14px;
    font-weight: 400;
    text-align: right;
    line-height: 1;
    margin-top: ${(props) => (props.type === 'work' ? '15px' : '5px')};
    span {
      background: ${(props) => props.color};
      border-radius: 16px;
      padding: 4px 13px;
      margin-left: 6px;
      color: ${Vars.backColor};
    }
  }
`

const PostCard = ({ type, data, href, category, className }) => {
  const [startDate] = useDate(data.date)
  const [endDate] = useDate(type === 'work' ? data.endDate : null)

  return (
    <ColorContext.Consumer>
      {(color) => (
        <CardWrapStyle>
          <Link href={href}>
            <CardStyle color={color.currColor.color}>
              {data.thumb && (
                <div className="image">
                  <Image src={type === 'work' ? `/images/${type}/${data.id}/thumb.jpeg` : data.thumb} className="thumb" alt="alt" width="100" height="100" />
                </div>
              )}
              <ContentsStyle color={color.currColor.color} type={type}>
                <div className="title">{data.title}</div>
                {type === 'work' && <div className="desc">{data.desc}</div>}
                <div className="date">{type === 'work' ? `${startDate.ko} ~ ${endDate ? endDate.ko : ''}` : `${startDate.ko}`}</div>
                <div className="category">
                  {category.map((el, idx) => (
                    <span key={idx}>{el}</span>
                  ))}
                </div>
              </ContentsStyle>
            </CardStyle>
          </Link>
        </CardWrapStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default PostCard
