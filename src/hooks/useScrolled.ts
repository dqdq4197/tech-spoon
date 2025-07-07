import { useRef, useState } from 'react'
import useEventListener from './useEventListener'

function useScrolled(threshold = 0) {
  const [isScrolled, setIsScrolled] = useState(false)
  const ticking = useRef(false)

  useEventListener('scroll', () => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const shouldBeScrolled = window.scrollY > threshold

        setIsScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev))
        ticking.current = false
      })

      ticking.current = true
    }
  })

  return isScrolled
}

export default useScrolled
