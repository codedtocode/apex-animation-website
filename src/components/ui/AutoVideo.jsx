import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useInViewport } from '@/hooks/useInViewport'
import { prefersReducedMotion } from '@/lib/motion'

const PRELOAD_MARGIN = '600px 0px'
const PLAY_THRESHOLD = 0.2

const ignoreAutoplayRejection = () => {}

export function AutoVideo({ media, fill = false }) {
  const videoRef = useRef(null)
  const shouldLoad = useInViewport(videoRef, { rootMargin: PRELOAD_MARGIN, once: true })
  const isVisible = useInViewport(videoRef, { threshold: PLAY_THRESHOLD })
  const [paused, setPaused] = useState(prefersReducedMotion)

  useEffect(() => {
    if (!shouldLoad) return
    const video = videoRef.current
    if (isVisible && !paused) video.play().catch(ignoreAutoplayRejection)
    else video.pause()
  }, [shouldLoad, isVisible, paused])

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
      <button
        type="button"
        onClick={() => setPaused((isPaused) => !isPaused)}
        aria-label={paused ? `Play ${media.title}` : `Pause ${media.title}`}
        className={`absolute right-2.5 bottom-2.5 grid size-8 place-items-center rounded-lg border border-line bg-canvas text-fg transition hover:bg-apex-500 hover:text-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-fg ${
          paused ? '' : 'lg:opacity-0 lg:group-hover/video:opacity-100'
        }`}
      >
        {paused ? <Play className="size-3.5 fill-current" /> : <Pause className="size-3.5 fill-current" />}
      </button>
    </div>
  )
}
