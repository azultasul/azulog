import styled from  'styled-components';
import Vars from "~/styles/Variables"

const Test = styled.div`
  div {
    width: 100%;
    color: ${Vars.test};
    font-family: 'cafe';
    font-size: 50rem;
    font-weight: bold;
  }
`

const Work = () => {
  return (
    <Test>
      <div>안녕하세요. 유다솔 </div>
      <div>Hello Im Dasol Yoo</div>
    </Test>
  )
}

export default Work;