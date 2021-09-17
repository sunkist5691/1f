import { useState, useRef, useEffect } from 'react'

const useOutsideAlert = (initialValue: boolean) => {
  const ref = useRef<HTMLDivElement>(null)
  const [close, setClose] = useState<boolean>(initialValue)

  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      console.log(ref.current.contains(e.target))
      setClose(true)
    } else setClose(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [ref])
  return { close, ref }
}

export default useOutsideAlert
