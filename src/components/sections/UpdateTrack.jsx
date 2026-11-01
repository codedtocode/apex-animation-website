import { useEffect, useRef } from 'react'
import { UPDATE_TRACK_KEYS } from '@/data/updates'
import { useInViewport } from '@/hooks/useInViewport'
import { prefersReducedMotion } from '@/lib/motion'

const SWEEP_MS = 7000
const HOLD_MS = 1200
const CYCLE_MS = SWEEP_MS + HOLD_MS
const HIGHLIGHT_SPAN = 0.11
const EDGE_ZONE = 0.2
const PLAY_THRESHOLD = 0.3

const progressAt = (elapsedMs) => Math.min(1, (elapsedMs % CYCLE_MS) / SWEEP_MS)

const keyStateAt = (progress, position) => {
  const sincePassed = progress - position
  if (sincePassed < 0) return 'idle'
  return sincePassed < HIGHLIGHT_SPAN ? 'highlighted' : 'passed'
}

const tagAlignment = (position) => {
  if (position < EDGE_ZONE) return 'left-0 -translate-x-4'
  if (position > 1 - EDGE_ZONE) return 'right-0 translate-x-4'
  return 'left-0 -translate-x-1/2'
}

const toPercent = (fraction) => `${fraction * 100}%`

function Playhead({ ref }) {
  return (
    <div ref={ref} className="absolute -top-3.5 left-0 flex -translate-x-1/2 flex-col items-center">
      <span className="h-2.5 w-3.5 rounded-t-[3px] bg-apex-500 [clip-path:polygon(0_0,100%_0,100%_55%,50%_100%,0_55%)]" />
      <span className="h-11 w-0.5 bg-apex-500/80" />
    </div>
  )
}

function TrackKey({ trackKey: { position, label, icon: Icon }, keyRef, tagRef }) {
  return (
    <div className="absolute top-0 h-8" style={{ left: toPercent(position) }}>
      <span
        ref={keyRef}
        data-state="idle"
        className="absolute top-1/2 left-0 block size-3 -translate-1/2 rotate-45 rounded-[3px] bg-ink-600 transition-[background-color,box-shadow,scale] duration-300 data-[state=highlighted]:scale-140 data-[state=highlighted]:bg-white data-[state=highlighted]:shadow-[0_0_18px_rgba(225,29,38,0.9)] data-[state=highlighted]:ring-2 data-[state=highlighted]:ring-apex-500 data-[state=passed]:bg-apex-500 data-[state=passed]:shadow-[0_0_10px_rgba(225,29,38,0.6)]"
      />
      <span
        ref={tagRef}
        data-visible="false"
        className={`absolute bottom-[calc(100%+20px)] flex translate-y-1 items-center gap-1.5 rounded-full bg-ink-950 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 ring-1 ring-apex-500/50 transition duration-300 data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 ${tagAlignment(position)}`}
      >
        <Icon className="size-3.5 text-apex-400" />
        {label}
      </span>
    </div>
  )
}

export function UpdateTrack() {
  const rootRef = useRef(null)
  const trailRef = useRef(null)
  const playheadRef = useRef(null)
  const keyRefs = useRef([])
  const tagRefs = useRef([])
  const isVisible = useInViewport(rootRef, { threshold: PLAY_THRESHOLD })

  useEffect(() => {
    const paint = (progress) => {
      trailRef.current.style.width = toPercent(progress)
      playheadRef.current.style.left = toPercent(progress)
      UPDATE_TRACK_KEYS.forEach(({ position }, index) => {
        const state = keyStateAt(progress, position)
        keyRefs.current[index].dataset.state = state
        tagRefs.current[index].dataset.visible = String(state === 'highlighted')
      })
    }

    if (prefersReducedMotion()) {
      paint(1)
      return
    }
    if (!isVisible) return

    let frame
    let startedAt
    const tick = (now) => {
      startedAt ??= now
      paint(progressAt(now - startedAt))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isVisible])

  return (
    <div ref={rootRef} aria-hidden="true" className="relative mx-4 pt-14 sm:mx-8">
      <div className="relative h-8">
        <div className="absolute inset-x-0 top-[15px] h-0.5 rounded-full bg-white/10" />
        <div
          ref={trailRef}
          className="absolute top-[15px] left-0 h-0.5 w-0 rounded-full bg-linear-to-r from-apex-800 via-apex-500 to-apex-400 shadow-[0_0_12px_rgba(225,29,38,0.7)]"
        />
        <Playhead ref={playheadRef} />
        {UPDATE_TRACK_KEYS.map((trackKey, index) => (
          <TrackKey
            key={trackKey.id}
            trackKey={trackKey}
            keyRef={(element) => (keyRefs.current[index] = element)}
            tagRef={(element) => (tagRefs.current[index] = element)}
          />
        ))}
      </div>
    </div>
  )
}
