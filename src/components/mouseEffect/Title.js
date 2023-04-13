import Link from 'next/link'
import styled from 'styled-components'
import ColorContext from '~/store/ColorContext'

const TitleStyle = styled.div``

const LinedButton = ({}) => {
  return <ColorContext.Consumer>{(color) => <TitleStyle color={color.currColor.color}>AZULOG</TitleStyle>}</ColorContext.Consumer>
}

export default LinedButton
