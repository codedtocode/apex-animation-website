import { useEffect, useState } from 'react'

export function useInViewport(ref, { rootMargin = '0px', threshold = 0, once = false } = {}) {
  const [inViewport, setInViewport] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry.isIntersecting)
        if (once && entry.isIntersecting) observer.disconnect()
      },
      { rootMargin, threshold },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin, threshold, once])

  return inViewport
}
