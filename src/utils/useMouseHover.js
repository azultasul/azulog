import { useEffect, useState } from 'react'

const useMouseEvent = (ref) => {
  useEffect(() => {
    const cursor = document.querySelector('.c-cursor')
    ref?.current?.addEventListener('mouseover', () => {
      cursor?.classList.add('click')
    })
    ref?.current?.addEventListener('mouseout', () => {
      cursor?.classList.remove('click')
    })
    ref?.current?.addEventListener('click', () => {
      cursor?.classList.remove('click')
    })

    return () => {
      ref?.current?.removeEventListener('mouseover', () => {
        cursor?.classList.add('click')
      })
      ref?.current?.removeEventListener('mouseout', () => {
        cursor?.classList.remove('click')
      })
      ref?.current?.removeEventListener('click', () => {
        cursor?.classList.remove('click')
      })
    }
  }, [])
}
export default useMouseEvent
