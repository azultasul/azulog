import { forwardRef, useEffect, useRef, useState, useContext, createContext } from 'react'

const useWindow = () => {
  const [windowSize, setWindowSize] = useState({ w: null, h: null })

  useEffect(() => {
    const resizeHandler = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight })
    }

    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])
  return [windowSize]
}
export default useWindow
