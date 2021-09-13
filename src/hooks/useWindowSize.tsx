import { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [size, setSize] = useState(window.innerWidth)
  const isMobile = () => {
    if (size <= 600) return true
    return false
  }
  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return [isMobile(), size]
}

export default useWindowSize
