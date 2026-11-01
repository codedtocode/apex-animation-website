import { useEffect } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const EASING = 0.06
const SETTLE_PX = 0.5

export function useEasedScroll(onFrame) {
  useEffect(() => {
    if (prefersReducedMotion()) return

    let frame
    let easedScroll = window.scrollY
    const render = () => {
      const target = window.scrollY
      easedScroll += (target - easedScroll) * EASING
      if (Math.abs(target - easedScroll) < SETTLE_PX) easedScroll = target

      onFrame(easedScroll)
      frame = easedScroll === target ? undefined : requestAnimationFrame(render)
    }
    const scheduleRender = () => {
      frame ??= requestAnimationFrame(render)
    }

    render()
    window.addEventListener('scroll', scheduleRender, { passive: true })
    return () => {
      window.removeEventListener('scroll', scheduleRender)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [onFrame])
}
