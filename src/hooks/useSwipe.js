import { useRef } from 'react'

const SWIPE_PX = 48

const OWN_DRAG_SELECTOR = 'input, button'

export function useSwipe(onStep) {
  const startRef = useRef(null)

  return {
    onPointerDown: (event) => {
      const swipes = event.pointerType !== 'mouse' && !event.target.closest(OWN_DRAG_SELECTOR)
      startRef.current = swipes ? { x: event.clientX, y: event.clientY } : null
    },
    onPointerUp: (event) => {
      const start = startRef.current
      startRef.current = null
      if (!start) return
      const dx = event.clientX - start.x
      const dy = event.clientY - start.y
      if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) onStep(dx < 0 ? 1 : -1)
    },
    onPointerCancel: () => {
      startRef.current = null
    },
  }
}
