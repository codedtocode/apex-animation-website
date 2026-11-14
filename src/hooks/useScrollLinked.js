import { useEffect } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const KEYFRAME_COUNT = 16
const EASING = 0.06
const SETTLE_PX = 0.5

const sampleKeyframes = ({ styleAt }) =>
  Array.from({ length: KEYFRAME_COUNT + 1 }, (_, index) => {
    const offset = index / KEYFRAME_COUNT
    return { offset, ...styleAt(offset) }
  })

function runOnScrollTimeline(tracks) {
  const timeline = new ScrollTimeline({ source: document.documentElement })
  const animations = tracks.flatMap((track) => {
    const keyframes = sampleKeyframes(track)
    return track.targets().map((target) => target.animate(keyframes, { timeline, fill: 'both' }))
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

    const scrollRange = document.documentElement.scrollHeight - window.innerHeight
    const progress = scrollRange > 0 ? Math.min(Math.max(easedScroll / scrollRange, 0), 1) : 0
    for (const { targets, styleAt } of tracks) {
      const style = styleAt(progress)
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

export function useScrollLinked(tracks) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    return typeof ScrollTimeline === 'undefined' ? followEasedScroll(tracks) : runOnScrollTimeline(tracks)
  }, [tracks])
}
