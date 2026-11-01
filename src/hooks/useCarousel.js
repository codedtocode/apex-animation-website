import { useCallback, useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const EDGE_TOLERANCE_PX = 1

export function useCarousel() {
  const trackRef = useRef(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    const updateEdges = () => {
      setCanScrollPrev(track.scrollLeft > EDGE_TOLERANCE_PX)
      setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - EDGE_TOLERANCE_PX)
    }

    updateEdges()
    track.addEventListener('scroll', updateEdges, { passive: true })
    const resizeObserver = new ResizeObserver(updateEdges)
    resizeObserver.observe(track)
    return () => {
      track.removeEventListener('scroll', updateEdges)
      resizeObserver.disconnect()
    }
  }, [])

  const scrollByItem = useCallback((direction) => {
    const track = trackRef.current
    const itemWidth = track.firstElementChild.offsetWidth
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({
      left: direction * (itemWidth + gap),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }, [])

  const scrollPrev = useCallback(() => scrollByItem(-1), [scrollByItem])
  const scrollNext = useCallback(() => scrollByItem(1), [scrollByItem])

  return { trackRef, canScrollPrev, canScrollNext, scrollPrev, scrollNext }
}
