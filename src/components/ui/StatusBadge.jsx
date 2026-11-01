const DOT_TONES = {
  neutral: 'bg-fg',
  yellow: 'bg-amber-400',
  blue: 'bg-sky-500',
}

export function StatusBadge({ tone = 'neutral', children }) {
  const dotColor = DOT_TONES[tone]

  return (
    <span className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-canvas px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider uppercase">
      <span className="relative flex size-2">
        <span
          className={`absolute inline-flex size-full animate-ping rounded-full opacity-70 motion-reduce:animate-none ${dotColor}`}
        />
        <span className={`relative inline-flex size-2 rounded-full ${dotColor}`} />
      </span>
      {children}
    </span>
  )
}
