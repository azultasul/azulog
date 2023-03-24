import Link from 'next/link';
import styled from  'styled-components';
import ColorContext from "~/store/ColorContext";

const LinedStyle = styled.div`
  display: inline-block;
  position: relative;
  .lined-text {
    display: inline-block;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 5px;
      width: 0%;
      height: 1px;
      background: ${props => props.color};
    }
  }
  &.lined {
    .lined-text {
      color: transparent;
      -webkit-text-stroke: ${props => `1px ${props.color}`};
    }
  }
  &.filled {
    .lined-text {
      color: ${props => props.color};
    }
  }
  &:hover, &:has(.clicked) {
    .lined-text {
      transform: skew(-20deg);
      transition: 0.3s;
      &:after {
        width: 100%;
        transition: width 0.3s;
      }
    }
    &.lined {
      .lined-text {
        color: ${props => props.color};
      }
    }
    &.filled {
      .lined-text {
        color: transparent;
        -webkit-text-stroke: ${props => `1px ${props.color}`};
      }
    }
  }
`

const LinedButton = ({ type, style = 'filled', title, onClick, href, children, className }) => {
  // style: filled / lined

  return (
    <ColorContext.Consumer>
      {color => (
        <LinedStyle color={color.currColor.color} className={`${style}`}>
          {type === 'button'
            ? <button onClick={onClick} className={`lined-text lined-button ${className}`}>
                {title}
                <>{children}</>
              </button>
            : type === 'link'
              ? <Link href={href} onClick={onClick} className={`lined-text lined-link ${className}`}>
                  {title}
                  <>{children}</>
                </Link>
              // : <div className={`lined-text ${className}`}>{title}</div>
              : <>{children}</>
          }
        </LinedStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default LinedButton;