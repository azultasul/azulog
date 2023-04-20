import { useEffect, useState, useCallback } from 'react'
import useWindow from '~/utils/useWindow'

const useMousePos = () => {
  const [windowSize] = useWindow()
  const [mousePos, setMousePos] = useState({ x: windowSize.w / 2, y: windowSize.h / 2, sy: null })
  const [delta, setDelta] = useState({ x: null, y: null })
  const [speed, setSpeed] = useState(0)
  const [lastState, setLastState] = useState({ x: null, y: null, t: null })
  const [timeCheck, setTimeCheck] = useState(true)
  const delay = 100

  const mouseMoveHandler = useCallback((event) => {
    const { clientX, clientY } = event
    setMousePos((prev) => {
      return { ...prev, x: clientX, y: clientY }
    })
  }, [])

  const scrollHandler = useCallback((event) => {
    setMousePos((prev) => {
      return { ...prev, sy: window.scrollY }
    })
  }, [])

  useEffect(() => {
    if (timeCheck) {
      const now = Date.now()
      const dt = now - lastState.t
      const distance = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2))
      // const delay = Math.round(distance / 10) / 20
      setSpeed((distance / dt).toFixed(2))

      setLastState((prev) => {
        return { ...prev, t: now }
      })

      setTimeCheck(false)
      const timeout = setTimeout(function () {
        setTimeCheck(true)
        clearTimeout(timeout)
      }, delay)
    }
  }, [delta])

  useEffect(() => {
    setDelta((prev) => {
      return { ...prev, x: mousePos.x - lastState.x, y: mousePos.y - lastState.y }
    })
    setLastState((prev) => {
      return { ...prev, x: mousePos.x, y: mousePos.y }
    })
  }, [mousePos])

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('scroll', scrollHandler)

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return [mousePos, delta, speed]
}
export default useMousePos
