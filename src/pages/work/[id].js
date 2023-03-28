import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import LinedButton from '~/components/LinedButton'
import ColorContext from '~/store/ColorContext'

import MarkdownStyle from '~/styles/MarkdownStyle'
import FilledTitle from '~/components/FilledTitle'

import useDate from '~/utils/useDate'
import Vars from '~/data/Variables'
import Works from '~/data/Works'
import Cat from '~/data/Categories'
import styled from 'styled-components'

const WorkStyle = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding-top: 90px;
  font-size: 16px;
`

const InfoStyle = styled.div`
  max-width: 800px;
  margin: 44px auto 0;

  .lined-wrap {
    text-align: right;
    width: 55%;
    margin: 0 0 0 auto;
  }
  .lined-text {
    font-size: 20px;
    font-weight: 700;
    margin-left: 12px;
    line-height: 1.3;
  }
  .site {
    font-size: 23px;
  }
`

const ContentsStyle = styled(MarkdownStyle)`
  .info {
    margin-top: 4px;
    &-wrap {
      padding-left: 10px;
      padding-right: 10px;
    }
    &__title {
      font-weight: bold;
    }
    &__learn {
      padding-left: 35px;
      margin: 0;
    }
  }
  .work {
    display: flex;
    align-items: center;
    margin-top: 50px;
    &-wrap {
    }
    &__image {
      flex: 1.8;
      img {
        margin-top: 0;
      }
    }
    &__number {
      font-weight: normal;
      font-size: 0.6em;
      padding-right: 5px;
      opacity: 0.7;
      vertical-align: top;
    }
    &__title {
      margin: 0;
    }
    &__desc {
      &-wrap {
        flex: 1;
        padding-left: 24px;
      }
    }

    &:first-child {
      margin-top: 0px;
    }
    &:nth-child(2n) {
      flex-direction: row-reverse;
      .work {
        &__desc {
          &-wrap {
            padding-left: 0px;
            padding-right: 24px;
          }
        }
      }
    }
  }
`

export async function getStaticPaths() {
  const paths = Works.map((work) => {
    return {
      params: {
        id: work.id,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

// `getStaticPaths` requires using `getStaticProps`}
export async function getStaticProps({ params }) {
  const work = Works.filter((data) => data.id === params.id)[0]

  return {
    props: {
      work,
    },
  }
}

const WorkDetail = ({ work }) => {
  const [startDate] = useDate(work.date)
  const [endDate] = useDate(work.endDate)
  const [term] = useDate(work.date, work.endDate)

  return (
    <ColorContext.Consumer>
      {(color) => (
        <WorkStyle>
          <FilledTitle title={work.title} fontSize="50px" topGap="0px" lineHeight="1.5" />
          <InfoStyle>
            <div className="lined-wrap">
              {work.url && <LinedButton type="link" href={work.url} style="lined" title="사이트 보기" className="site"></LinedButton>}
              <br />
              {work.category?.map((cat, idx) => (
                // <Link href={`/work?tag=${cat}`} key={idx}>{Cat.techStack[cat]}</Link>
                <LinedButton key={idx} type="link" href={`/work?tag=${cat}`} style="filled" title={`#${Cat.techStack[cat]}`}></LinedButton>
              ))}
            </div>
          </InfoStyle>
          <ContentsStyle>
            <h1>설명</h1>
            <hr />
            <div className="info-wrap">
              <div className="info">
                <span className="info__title">📚 기간</span> | {`${startDate.ko} ~ ${endDate ? `${endDate.ko} (${term.termMonth}개월)` : ''} `}
              </div>
              <div className="info">
                <span className="info__title">📚 클라이언트</span> | {work.client}
              </div>
              <div className="info">
                <span className="info__title">📚 설명</span> | {work.desc}
              </div>
              <div className="info">
                <span className="info__title">📚 배운점</span>
                <ul className="info__learn">
                  {work.learn.map((el, idx) => (
                    // <li key={idx}>{el}</li>
                    <li key={idx} dangerouslySetInnerHTML={{ __html: el }} />
                  ))}
                </ul>
              </div>
            </div>

            <h1>작업 내용</h1>
            <hr />
            <div className="work-wrap">
              {work.work.map((el, idx) => (
                <div className="work" key={idx}>
                  <div className="work__image">
                    <Image src={`/images/work/${work.id}/${el.image}`} alt="alt" width="100" height="100" />
                  </div>
                  <div className="work__desc-wrap">
                    {el.title && (
                      <h3 className="work__title">
                        {el.number && <span className="work__number">{el.number}</span>}
                        {el.title}
                      </h3>
                    )}
                    {el.desc && <div className="work__desc">{el.desc}</div>}
                  </div>
                </div>
              ))}
            </div>
          </ContentsStyle>
        </WorkStyle>
      )}
    </ColorContext.Consumer>
  )
}

export default WorkDetail
