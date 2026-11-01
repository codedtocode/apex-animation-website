const PARTICLES = [
  { left: '22%', top: '72%', size: 6, delay: 0, duration: 7, red: true },
  { left: '30%', top: '48%', size: 4, delay: 1.4, duration: 6 },
  { left: '36%', top: '82%', size: 7, delay: 2.6, duration: 8 },
  { left: '64%', top: '78%', size: 5, delay: 0.8, duration: 6.5, red: true },
  { left: '70%', top: '52%', size: 4, delay: 3.3, duration: 7.5 },
  { left: '76%', top: '86%', size: 7, delay: 1.9, duration: 6, red: true },
  { left: '82%', top: '64%', size: 5, delay: 4.1, duration: 8 },
  { left: '15%', top: '58%', size: 4, delay: 2.2, duration: 7 },
  { left: '88%', top: '76%', size: 4, delay: 0.4, duration: 6.5, red: true },
]

const REDACTED_LINE_WIDTHS = ['w-40', 'w-24', 'w-32', 'w-16', 'w-28']

export function MysteryStrip() {
  return (
    <div aria-hidden="true" className="relative aspect-3/1 overflow-hidden bg-ink-950">
      <div className="absolute top-1/2 left-1/2 size-56 -translate-1/2 animate-pulse rounded-full bg-apex-500/20 blur-3xl motion-reduce:animate-none" />
      {PARTICLES.map(({ left, top, size, delay, duration, red }) => (
        <span
          key={`${left}-${top}`}
          className={`absolute rotate-45 animate-drift rounded-[1px] opacity-0 blur-[0.5px] motion-reduce:animate-none motion-reduce:opacity-40 ${
            red ? 'bg-apex-400' : 'bg-white/80'
          }`}
          style={{
            left,
            top,
            width: size,
            height: size,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      ))}
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid aspect-square h-[78%] place-items-center rounded-[22%] bg-ink-850 font-display text-[2.6em] font-bold text-white/70 shadow-[0_20px_50px_-15px_rgba(225,29,38,0.55)] ring-1 ring-white/12 sm:text-[3.4em]">
          ?
        </span>
      </div>
    </div>
  )
}

export function RedactedLines() {
  return (
    <div aria-hidden="true" className="mt-5 flex flex-wrap gap-2">
      {REDACTED_LINE_WIDTHS.map((width, index) => (
        <span key={index} className={`h-3 rounded-sm bg-white/10 ${width}`} />
      ))}
    </div>
  )
}
