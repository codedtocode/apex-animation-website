const PARTICLES = [
  { left: '22%', top: '72%', size: 7, delay: 0, duration: 7, red: true },
  { left: '30%', top: '48%', size: 5, delay: 1.4, duration: 6 },
  { left: '36%', top: '82%', size: 8, delay: 2.6, duration: 8 },
  { left: '64%', top: '78%', size: 6, delay: 0.8, duration: 6.5, red: true },
  { left: '70%', top: '52%', size: 5, delay: 3.3, duration: 7.5 },
  { left: '76%', top: '86%', size: 8, delay: 1.9, duration: 6, red: true },
  { left: '82%', top: '64%', size: 6, delay: 4.1, duration: 8 },
  { left: '15%', top: '58%', size: 5, delay: 2.2, duration: 7 },
  { left: '88%', top: '76%', size: 5, delay: 0.4, duration: 6.5, red: true },
]

const REDACTED_LINE_WIDTHS = ['w-40', 'w-24', 'w-32', 'w-16', 'w-28']

export function MysteryStrip() {
  return (
    <div aria-hidden="true" className="relative aspect-3/1 overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 bg-halftone" />
      {PARTICLES.map(({ left, top, size, delay, duration, red }) => (
        <span
          key={`${left}-${top}`}
          className={`absolute rotate-45 animate-drift opacity-0 motion-reduce:animate-none motion-reduce:opacity-40 ${
            red ? 'bg-apex-500' : 'bg-paper'
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
        <span className="grid aspect-square h-[70%] -rotate-3 place-items-center border-[3px] border-paper bg-ink pt-[0.1em] font-hand text-[3em] leading-none font-bold text-apex-500 shadow-[6px_6px_0_var(--color-apex-500)] sm:text-[4em]">
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
        <span key={index} className={`h-3.5 bg-ink ${width}`} />
      ))}
    </div>
  )
}
