import styled from  'styled-components';
import Vars from "~/styles/Variables"
import GridRow from '~/components/layout/GridRow'

const Test = styled.div`
  width: 100%;
  font-size: 70rem;
  font-weight: bold;
`

const Work = () => {
  return (
    <Test>
      <div className='grid-container'>
          <GridRow grid={4}>
            <div>안녕안녕</div>
            <div>하이하이</div>
            <div>바아이</div>
          </GridRow>
          <GridRow grid={8}>
            <div>영역2</div>
          </GridRow>
      </div>
    </Test>
  )
}

export default Work;