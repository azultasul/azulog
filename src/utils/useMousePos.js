import { useEffect, useState } from 'react'

const useMousePos = () => {
  const [mousePos, setMousePos] = useState({ x: null, y: null, sy: null })

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
