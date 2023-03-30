// Comments.tsx
import { useEffect, useRef } from 'react'
import Vars from '~/data/Variables'
import styled from 'styled-components'

const CommentStyle = styled.div`
  margin-top: 70px;
  padding-bottom: 100px;
  .utterances {
    max-width: 800px;
    width: 100%;
  }
`

const Comments = () => {
  const commentsRef = useRef(null)

  useEffect(() => {
    const scriptEl = document.createElement('script')
    scriptEl.src = 'https://utteranc.es/client.js'
    scriptEl.async = true
    scriptEl.crossOrigin = 'anonymous'
    scriptEl.setAttribute('repo', 'azultasul/azulog')
    scriptEl.setAttribute('issue-term', 'pathname')
    scriptEl.setAttribute('theme', `boxy-light`)
    scriptEl.setAttribute('label', '💬 Discussion')

    commentsRef.current?.appendChild(scriptEl)
  }, [])

  return (
    <CommentStyle>
      <section ref={commentsRef} />
    </CommentStyle>
  )
}

export default Comments
