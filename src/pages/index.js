import { useState, useEffect } from 'react'
import Falling from '~/components/Falling'
import FilledTitle from '~/components/FilledTitle'
import styled from 'styled-components'

export default function Home() {
  useEffect(() => {
    document.body.dataset.pageName = 'home'
  }, [])

  return (
    <>
      {/* <FilledTitle title='AZULOG' top='100px' left='50%' fontSize='250rem' position='absolute'/> */}
      <Falling></Falling>
    </>
  )
}
