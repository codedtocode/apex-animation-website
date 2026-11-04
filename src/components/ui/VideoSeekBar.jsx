import { useEffect, useState } from 'react'

const formatTime = (seconds) => {
  const whole = Math.floor(seconds)
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`
}

export function VideoSeekBar({ videoRef, title, onScrubStart }) {
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    let frame = 0
    const syncTime = () => setTime(video.currentTime)
    const followPlayback = () => {
      syncTime()
      frame = requestAnimationFrame(followPlayback)
    }
    const startFollowing = () => {
      cancelAnimationFrame(frame)
      followPlayback()
    }
    const stopFollowing = () => {
      cancelAnimationFrame(frame)
      syncTime()
    }
    const syncDuration = () => setDuration(video.duration || 0)

    video.addEventListener('play', startFollowing)
    video.addEventListener('pause', stopFollowing)
    video.addEventListener('seeked', syncTime)
    video.addEventListener('durationchange', syncDuration)
    return () => {
      cancelAnimationFrame(frame)
      video.removeEventListener('play', startFollowing)
      video.removeEventListener('pause', stopFollowing)
      video.removeEventListener('seeked', syncTime)
      video.removeEventListener('durationchange', syncDuration)
    }
  }, [videoRef])

  const seek = (event) => {
    const nextTime = Number(event.target.value)
    videoRef.current.currentTime = nextTime
    setTime(nextTime)
  }

  return (
    <>
      <input
        type="range"
        min={0}
        max={duration}
        step="any"
        value={time}
        disabled={!duration}
        onChange={seek}
        onPointerDown={onScrubStart}
        aria-label={`Seek ${title}`}
        aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
        className="seek-bar min-w-0 flex-1"
        style={{ '--progress': duration ? time / duration : 0 }}
      />
      <span className="shrink-0 pr-1 font-mono text-xs tracking-wider text-fg-muted tabular-nums">
        {formatTime(time)} / {formatTime(duration)}
      </span>
    </>
  )
}
