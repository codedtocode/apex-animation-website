import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const TILE_PX = 96
const GROUND_SPEED = 0.06
const HORIZON_SPEED = 0.012
const MAX_HORIZON_SHIFT_PX = 60
const EASING = 0.06
const SETTLE_PX = 0.5

export function StudioBackdrop() {
  const horizonRef = useRef(null)
  const groundRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    let frame
    let easedScroll = window.scrollY
    const render = () => {
      const target = window.scrollY
      easedScroll += (target - easedScroll) * EASING
      if (Math.abs(target - easedScroll) < SETTLE_PX) easedScroll = target

      groundRef.current.style.translate = `0 ${-((easedScroll * GROUND_SPEED) % TILE_PX)}px`
      horizonRef.current.style.translate = `0 ${Math.min(easedScroll * HORIZON_SPEED, MAX_HORIZON_SHIFT_PX)}px`
      frame = easedScroll === target ? undefined : requestAnimationFrame(render)
    }
    const scheduleUpdate = () => {
      frame ??= requestAnimationFrame(render)
    }

    render()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#060606] via-[#0e0e0f] via-40% to-[#242427] to-[46%]" />
      <div ref={horizonRef} className="absolute inset-0 will-change-transform">
        <div className="absolute top-[46%] left-1/2 h-[140%] w-[300%] origin-top -translate-x-1/2 [transform:perspective(900px)_rotateX(74deg)] overflow-hidden">
          <div
            ref={groundRef}
            className="absolute inset-x-0 -inset-y-24 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px),repeating-conic-gradient(#1c1c1f_0_25%,#151517_0_50%)] bg-size-[96px_96px] will-change-transform"
          />
        </div>
        <div className="absolute inset-x-0 top-[46%] h-[28%] bg-linear-to-b from-[#242427] to-transparent" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_46%,transparent_55%,rgb(0_0_0/0.3))]" />
      <div className="absolute inset-y-0 left-1/2 w-full max-w-stage -translate-x-1/2 border-x border-line bg-canvas" />
    </div>
  )
}
