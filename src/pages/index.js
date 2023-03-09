import Falling from '~/components/Falling'
import styled from  'styled-components';

const WelcomStyle = styled.div`
  position: relative;
  > div {
    position: absolute;
    left: 50%;
    transform: translate(-50%,100%);
    z-index: 100;
    font-family: 'elice';
    font-size: 50rem;
    font-weight: bold;
    color: blue;
  }
`

export default function Home() {
  return (
    <>
      <WelcomStyle>
        <div>Azulog</div>
      </WelcomStyle>
      <Falling></Falling>
    </>
  )
}
