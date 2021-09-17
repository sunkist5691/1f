import { useState, useRef, useEffect } from 'react'

const useOutsideAlert = (initialValue: boolean) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(initialValue)

  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) setVisible(false)
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [ref])
  return { visible, ref }
}

export default useOutsideAlert
