import Link from 'next/link'
import Image from 'next/image'
import Date from '~/components/Date'
import LinedButton from '~/components/LinedButton'
import useDate from '~/utils/useDate'
import Vars from '~/data/Variables'
import styled from 'styled-components'
import ColorContext from '~/store/ColorContext'

const TagStyle = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: right;
  line-height: 1;
  span {
    display: inline-block;
    background: ${(props) => props.color};
    border-radius: 16px;
    padding: 4px 13px;
    margin-left: 6px;
    margin-top: ${(props) => (props.type === 'work' ? '15px' : '5px')};
    color: ${Vars.backColor};
  }
`

const Tag = ({ tagList, className }) => {
  return (
    <ColorContext.Consumer>
      {(color) => (
        <TagStyle color={color.currColor.color} className={className}>
          {tagList?.map((el, idx) => (
            <span key={idx}>{el}</span>
          ))}
        </TagStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default Tag
