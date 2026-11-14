import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useInViewport } from '@/hooks/useInViewport'
import { useScrollSettled } from '@/hooks/useScrollSettled'
import { prefersReducedMotion } from '@/lib/motion'
import { VideoSeekBar } from './VideoSeekBar'

const PRELOAD_MARGIN = '600px 0px'
const PLAY_THRESHOLD = 0.2

const ignoreAutoplayRejection = () => {}

function PlayPauseButton({ paused, title, onToggle, className = '' }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? `Play ${title}` : `Pause ${title}`}
      className={`grid shrink-0 place-items-center transition focus-visible:outline-2 focus-visible:outline-fg ${className}`}
    >
      {paused ? <Play className="size-3.5 fill-current" /> : <Pause className="size-3.5 fill-current" />}
    </button>
  )
}

export function AutoVideo({ media, fill = false, seekable = false }) {
  const videoRef = useRef(null)
  const shouldLoad = useInViewport(videoRef, { rootMargin: PRELOAD_MARGIN, once: true })
  const isVisible = useInViewport(videoRef, { threshold: PLAY_THRESHOLD })
  const [paused, setPaused] = useState(prefersReducedMotion)
  const [scrubbing, setScrubbing] = useState(false)
  const scrollSettled = useScrollSettled()

  useEffect(() => {
    if (!shouldLoad) return
    const video = videoRef.current
    if (!isVisible || paused || scrubbing) video.pause()
    else if (scrollSettled || !video.paused) video.play().catch(ignoreAutoplayRejection)
  }, [shouldLoad, isVisible, paused, scrubbing, scrollSettled])

  useEffect(() => {
    if (!scrubbing) return
    const stopScrubbing = () => setScrubbing(false)
    window.addEventListener('pointerup', stopScrubbing)
    window.addEventListener('pointercancel', stopScrubbing)
    return () => {
      window.removeEventListener('pointerup', stopScrubbing)
      window.removeEventListener('pointercancel', stopScrubbing)
    }
  }, [scrubbing])

  const togglePaused = () => setPaused((isPaused) => !isPaused)

  return (
    <div className={`group/video ${fill ? 'absolute inset-0' : 'relative'}`}>
      <video
        ref={videoRef}
        src={shouldLoad ? media.src : undefined}
        poster={media.poster}
        width={media.width}
        height={media.height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`${media.title}: ${media.description}`}
        className={fill ? 'size-full object-contain' : 'block h-auto w-full'}
      />
      {seekable ? (
        <div
          className={`absolute inset-x-0 bottom-0 flex items-center gap-2 bg-linear-to-t from-black/70 to-transparent px-2 pt-8 pb-1 transition-opacity duration-200 has-focus-visible:opacity-100 ${
            paused || scrubbing ? '' : 'pointer-fine:opacity-0 pointer-fine:group-hover/video:opacity-100'
          }`}
        >
          <PlayPauseButton
            paused={paused}
            title={media.title}
            onToggle={togglePaused}
            className="size-7 rounded-md text-fg-muted hover:text-fg"
          />
          <VideoSeekBar videoRef={videoRef} title={media.title} onScrubStart={() => setScrubbing(true)} />
        </div>
      ) : (
        <PlayPauseButton
          paused={paused}
          title={media.title}
          onToggle={togglePaused}
          className={`absolute right-2.5 bottom-2.5 size-8 rounded-lg border border-line bg-canvas text-fg hover:bg-apex-500 hover:text-white focus-visible:opacity-100 ${
            paused ? '' : 'lg:opacity-0 lg:group-hover/video:opacity-100'
          }`}
        />
      )}
    </div>
  )
}
