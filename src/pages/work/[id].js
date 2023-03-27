import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LinedButton from '~/components/LinedButton'
import ColorContext from '~/store/ColorContext'

// import { getAllPostIds, getPostData } from '~/lib/getPost'
import MarkdownStyle from '~/styles/MarkdownStyle'
import FilledTitle from '~/components/FilledTitle'

import Vars from '~/data/Variables'
import Works from '~/data/Works'
import Cat from '~/data/Categories'
import styled from 'styled-components'

const InfoStyle = styled.div`
  max-width: 800px;
  margin: 44px auto 0;

  text-align: right;
  .date {
    font-size: 15px;
  }
  .lined-text {
    font-size: 20px;
    font-weight: 700;
    margin-left: 12px;
    line-height: 1.3;
  }
`

// export async function getStaticPaths() {
//   const paths = getAllPostIds('work')

//   return {
//     paths,
//     fallback: false,
//   }
// }

// // `getStaticPaths` requires using `getStaticProps`}
// export async function getStaticProps({ params }) {
//   const Works = await getPostData('work', params.id)

//   return {
//     props: {
//       Works,
//     },
//   }
// }

const WorkDetail = () => {
  // console.log("Works",Works);
  const router = useRouter()
  const [currData, setCurrData] = useState({})
  console.log('router', router.query.id)

  useEffect(() => {
    setCurrData(Works.filter((data) => data.id === router.query.id)[0])
  }, [router.query.id])
  useEffect(() => {
    console.log('currData', currData)
  }, [currData])

  return (
    <ColorContext.Consumer>
      {(color) => (
        <>
          <FilledTitle title={currData?.title} fontSize="50px" topGap="0px" lineHeight="1.5" />
          <InfoStyle>
            <div className="date">{currData?.date}</div>
            {currData?.category?.map((cat, idx) => (
              // <Link href={`/work?tag=${cat}`} key={idx}>{Cat.techStack[cat]}</Link>
              <LinedButton key={idx} type="link" href={`/work?tag=${cat}`} style="filled" title={`#${Cat.techStack[cat]}`}></LinedButton>
            ))}
          </InfoStyle>
        </>
      )}
    </ColorContext.Consumer>
  )
}

export default WorkDetail
