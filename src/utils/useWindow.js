import { forwardRef, useEffect, useRef, useState, useCallback, useContext, createContext } from 'react'

const useWindow = () => {
  const [windowSize, setWindowSize] = useState({ w: null, h: null })
  const [windowScroll, setWindowScroll] = useState({ x: null, y: null })

  const resizeHandler = useCallback(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight })
  }, [])

  const scrollHandler = useCallback((event) => {
    setWindowScroll((prev) => {
      return { ...prev, x: window.scrollX, y: window.scrollY }
    })
  }, [])

  useEffect(() => {
    resizeHandler()
    window.addEventListener('resize', resizeHandler)
    document.addEventListener('scroll', scrollHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])
  return [windowSize, windowScroll]
}
export default useWindow
