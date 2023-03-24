import styled from 'styled-components'

const GridStyle = styled.div`
  grid-column: ${(props) => `span ${props.grid}`};
`

const GridRow = ({ children, grid, className }) => {
  return (
    <GridStyle grid={grid} className={`row-${grid} ${className}`}>
      {children}
    </GridStyle>
  )
}

export default GridRow
