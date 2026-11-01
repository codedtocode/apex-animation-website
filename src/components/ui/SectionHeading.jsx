function Eyebrow({ centered, children }) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-ink-400 uppercase ${
        centered ? 'justify-center' : ''
      }`}
    >
      <span aria-hidden="true" className="h-0.5 w-7 rounded-full bg-white/40" />
      {children}
    </p>
  )
}

export function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`reveal max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      <Eyebrow centered={centered}>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-ink-300 sm:text-lg">{description}</p>}
    </div>
  )
}
