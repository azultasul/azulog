import Link from 'next/link'
import Github from '~/assets/github.svg'
import Mail from '~/assets/mail.svg'
import Vercel from '~/assets/vercel.svg'

import Vars from '~/data/Variables'
import styled from 'styled-components'
import ColorContext from '~/store/ColorContext'

const FooterStyle = styled.div`
  position: relative;
  max-width: ${Vars.sizes.l}px;
  width: 300px;
  padding-top: 30px;
  padding-bottom: 40px;
  margin: 130px auto 0px;
  border-top: ${(props) => `0.8px solid ${props.color}`};
  text-align: center;
  font-size: 14px;
  a {
    display: inline-block;
  }
  svg,
  path {
    fill: ${(props) => props.color};
    vertical-align: middle;
  }
  .contact {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    .azulog {
      font-weight: 500;
      font-size: 15px;
    }
  }
  .copy {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    opacity: 0.7;
    font-weight: 500;
    .vercel {
      transform: translate(0px, 3px);
    }
  }
`

const Footer = () => {
  return (
    <ColorContext.Consumer>
      {(color) => (
        <FooterStyle color={color.currColor.color} className="footer">
          <div className="contact">
            <Link href="https://github.com/azultasul" target="_blank">
              <Github width={20} height={20} viewBox="0 0 100 100"></Github>
            </Link>
            <a href="mailto:dasolyou@gmail.com">
              <Mail width={20} height={20} viewBox="0 0 23 23" />
            </a>
            <Link href="https://github.com/azultasul/azulog" target="_blank" className="azulog">
              azulog
            </Link>
          </div>
          <div className="copy">
            <div>© 2023 Dasol Yoo /</div>
            <Link href="https://vercel.com" target="_blank">
              <Vercel width={60} height={18} viewBox="100 0 100 100" className="vercel" />
            </Link>
          </div>
        </FooterStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default Footer
