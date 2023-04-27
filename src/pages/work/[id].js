import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
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
  padding-right: ${Vars.frame}px;
  padding-left: ${Vars.frame}px;
  font-size: 16px;
  ${Vars.media.md`
    padding-top: 50px;
  `};
`

const InfoStyle = styled.div`
  text-align: right;
  width: 55%;
  margin: 44px 0 0 auto;
  ${Vars.media.md`
    width: 85%;
  `};
  .lined-text {
    font-size: 20px;
    font-weight: 700;
    margin-left: 12px;
    line-height: 1.3;
  }
  .site {
    font-size: 24px;
    ${Vars.media.md`
      font-size: 22px;
    `};
  }
`

const ContentsStyle = styled(MarkdownStyle)`
  .info {
    margin-top: 4px;
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
    // align-items: center;
    margin-top: 50px;
    ${Vars.media.md`
      flex-direction: column-reverse;
      align-items: flex-start;
      margin-top: 20px;
    `};
    &__text {
      width: 100%;
    }
    &__image {
      position: relative;
      flex: 1.8;
      ${Vars.media.md`
        padding-left: 8px;
        padding-right: 8px;
      `};
      img {
        margin-top: 0;
        position: static;
      }
    }
    &__number {
      font-weight: normal;
      font-size: 0.6em;
      padding-right: 5px;
      opacity: 0.7;
      vertical-align: top;
      ${Vars.media.md`
        font-size: 0.8em;
      `};
    }
    &__title {
      margin: 0;
      ${Vars.media.md`
        margin-top: 40px;
      `};
    }
    &__desc {
      ${Vars.media.md`
        margin-bottom: 20px;
        padding-left: 8px;
        padding-right: 8px;
      `};
      &-wrap {
        flex: 1;
        padding-left: 24px;
        ${Vars.media.md`
          padding-left: 0px;
        `};
      }
    }

    &:first-child {
      margin-top: 0px;
    }
    &:nth-child(2n + 1) {
      flex-direction: row-reverse;
      ${Vars.media.md`
        flex-direction: column-reverse;
      `};
      .work {
        &__desc {
          &-wrap {
            padding-left: 0px;
            padding-right: 24px;
            padding-top: 24px;
            ${Vars.media.md`
              padding-right: 0px;
              padding-top: 0px;
            `};
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

  const NEXT_SEO = {
    description: `${work.desc}`,
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: `https://azulog.vercel.app/work/${work.id}`,
      title: `${work.title}`,
      site_name: 'Azulog',
      images: [
        {
          url: work.thumb ? `https://azulog.vercel.app/images/work/${work.id}/thumb.jpeg` : 'https://azulog.vercel.app/images/thumb/azulog.jpg',
          width: 400,
          height: 400,
          alt: '작업물 대표 이미지',
        },
      ],
    },
  }

  useEffect(() => {
    document.body.dataset.pageName = 'detail'
  }, [])

  return (
    <ColorContext.Consumer>
      {(color) => (
        <>
          <NextSeo {...NEXT_SEO} />
          <WorkStyle>
            <FilledTitle title={work.title} fontSize={['50px', '34px']} topGap="0px" lineHeight="1.5" />
            <InfoStyle>
              {work.url && <LinedButton type="link" href={work.url} style="lined" title="사이트 보기" className="site"></LinedButton>}
              <br />
              {work.tech?.map((cat, idx) => (
                <LinedButton key={idx} type="link" href={`/work?tech=${cat}`} style="filled" title={`#${Cat.tech[cat]}`}></LinedButton>
              ))}
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
              {work.work && (
                <>
                  <h1>작업 내용</h1>
                  <hr />
                  <div className="work-wrap">
                    {work.work.map((el, idx) => (
                      <div className="work" key={idx}>
                        {el.text ? (
                          <div className="work__text">{el.text}</div>
                        ) : (
                          <>
                            <div className="work__image">
                              {el.video && <video src={`/images/work/${work.id}/${el.video}`} autoPlay muted loop playsInline width="100%"></video>}
                              {el.image && <Image src={`/images/work/${work.id}/${el.image}`} alt="alt" unoptimized width="100" height="100" />}
                            </div>
                            <div className="work__desc-wrap">
                              {el.title && (
                                <h2 className="work__title">
                                  {el.number && <span className="work__number">{el.number}</span>}
                                  {el.title}
                                </h2>
                              )}
                              {el.desc && <div className="work__desc">{el.desc}</div>}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </ContentsStyle>
          </WorkStyle>
        </>
      )}
    </ColorContext.Consumer>
  )
}

export default WorkDetail
