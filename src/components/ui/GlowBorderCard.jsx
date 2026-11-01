export function GlowBorderCard({ restingBorder = 'bg-white/8', className = '', children }) {
  return (
    <article className={className}>
      <div className="group relative h-full rounded-3xl p-px transition-[scale] duration-300 ease-out hover:scale-102 motion-reduce:hover:scale-100">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-border-beam rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50"
        />
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 rounded-3xl ${restingBorder}`} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-border-beam rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-ink-900 p-8 sm:p-10">
          {children}
        </div>
      </div>
    </article>
  )
}
