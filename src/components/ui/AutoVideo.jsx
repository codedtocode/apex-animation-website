import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useInViewport } from '@/hooks/useInViewport'
import { prefersReducedMotion } from '@/lib/motion'

const PRELOAD_MARGIN = '600px 0px'
const PLAY_THRESHOLD = 0.2

const ignoreAutoplayRejection = () => {}

export function AutoVideo({ media }) {
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
    <div className="group/video relative">
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
        className="block h-auto w-full"
      />
      <button
        type="button"
        onClick={() => setPaused((isPaused) => !isPaused)}
        aria-label={paused ? `Play ${media.title}` : `Pause ${media.title}`}
        className={`absolute right-2.5 bottom-2.5 grid size-8 place-items-center rounded-lg bg-black/65 text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-black/85 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white ${
          paused ? '' : 'lg:opacity-0 lg:group-hover/video:opacity-100'
        }`}
      >
        {paused ? <Play className="size-3.5 fill-current" /> : <Pause className="size-3.5 fill-current" />}
      </button>
    </div>
  )
}
