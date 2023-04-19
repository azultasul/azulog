import { useEffect, useState } from 'react'
import useWindow from '~/utils/useWindow'

const useMousePos = () => {
  const [windowSize] = useWindow()
  const [mousePos, setMousePos] = useState({ x: windowSize.w / 2, y: windowSize.h / 2, sy: null })

  useEffect(() => {
    const mouseMoveHandler = (event) => {
      const { clientX, clientY } = event
      setMousePos((prev) => {
        return { ...prev, x: clientX, y: clientY }
      })
    }
    const scrollHandler = (event) => {
      setMousePos((prev) => {
        return { ...prev, sy: window.scrollY }
      })
    }
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('scroll', scrollHandler)

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return [mousePos]
}
export default useMousePos
