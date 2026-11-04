import { useEffect } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const KEYFRAME_COUNT = 32
const EASING = 0.06
const SETTLE_PX = 0.5

// Keyframes bunch up near the top of the range, where the scroll-linked curves bend the most.
const sampleKeyframes = ({ styleAt, rangePx }) =>
  Array.from({ length: KEYFRAME_COUNT + 1 }, (_, index) => {
    const offset = (index / KEYFRAME_COUNT) ** 2
    return { offset, ...styleAt(offset * rangePx) }
  })

function runOnScrollTimeline(tracks) {
  const timeline = new ScrollTimeline({ source: document.documentElement })
  const animations = tracks.flatMap((track) => {
    const keyframes = sampleKeyframes(track)
    return track
      .targets()
      .map((target) =>
        target.animate(keyframes, { timeline, rangeStart: '0px', rangeEnd: `${track.rangePx}px`, fill: 'both' }),
      )
  })
  return () => animations.forEach((animation) => animation.cancel())
}

function followEasedScroll(tracks) {
  let frame
  let easedScroll = window.scrollY
  const render = () => {
    const target = window.scrollY
    easedScroll += (target - easedScroll) * EASING
    if (Math.abs(target - easedScroll) < SETTLE_PX) easedScroll = target

    for (const { targets, styleAt } of tracks) {
      const style = styleAt(easedScroll)
      targets().forEach((element) => Object.assign(element.style, style))
    }
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
}

// Drives styles from the page scroll. Each track maps a scroll offset to a style for its targets
// over its first rangePx of scrolling. Where scroll timelines exist the tracks run as compositor
// animations, which keep pace with the page even while the main thread is busy; elsewhere they
// ease toward the scroll position once per animation frame.
export function useScrollLinked(tracks) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    return typeof ScrollTimeline === 'undefined' ? followEasedScroll(tracks) : runOnScrollTimeline(tracks)
  }, [tracks])
}
