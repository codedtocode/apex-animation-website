import { useCallback, useRef } from 'react'
import { useEasedScroll } from '@/hooks/useEasedScroll'

const TILE_PX = 96
const GROUND_SPEED = 0.06
const HORIZON_SPEED = 0.012
const MAX_HORIZON_SHIFT_PX = 60

export function StudioBackdrop() {
  const horizonRef = useRef(null)
  const groundRef = useRef(null)

  const moveScene = useCallback((scrolled) => {
    groundRef.current.style.translate = `0 ${-((scrolled * GROUND_SPEED) % TILE_PX)}px`
    horizonRef.current.style.translate = `0 ${Math.min(scrolled * HORIZON_SPEED, MAX_HORIZON_SHIFT_PX)}px`
  }, [])
  useEasedScroll(moveScene)

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
