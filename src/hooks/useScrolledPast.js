import { useEffect, useState } from 'react'

export function useScrolledPast(offset) {
  const [scrolledPast, setScrolledPast] = useState(false)

  useEffect(() => {
    const update = () => setScrolledPast(window.scrollY > offset)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [offset])

  return scrolledPast
}
