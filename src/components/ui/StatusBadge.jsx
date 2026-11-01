const DOT_TONES = {
  neutral: 'bg-white',
  yellow: 'bg-amber-400',
  blue: 'bg-sky-400',
}

export function StatusBadge({ tone = 'neutral', children }) {
  const dotColor = DOT_TONES[tone]

  return (
    <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/6 px-3 py-1 text-xs font-semibold text-ink-200 ring-1 ring-white/10">
      <span className="relative flex size-2">
        <span
          className={`absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:animate-none ${dotColor}`}
        />
        <span className={`relative inline-flex size-2 rounded-full ${dotColor}`} />
      </span>
      {children}
    </span>
  )
}
