import { useEffect, useState } from 'react'

const useMouse = () => {
  const [mousePos, setMousePos] = useState({ x: null, y: null })

  useEffect(() => {
    const mouseMoveHandler = (event) => {
      // console.log('event', event)
      const { pageX, pageY } = event
      setMousePos({ x: pageX, y: pageY })
    }
    document.addEventListener('mousemove', mouseMoveHandler)

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [])

  return [mousePos]
}
export default useMouse
