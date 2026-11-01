import { ChevronLeft, ChevronRight } from 'lucide-react'

const DIRECTIONS = {
  previous: { label: 'Previous', icon: ChevronLeft, nudge: 'hover:-translate-x-1' },
  next: { label: 'Next', icon: ChevronRight, nudge: 'hover:translate-x-1' },
}

export function CarouselArrow({ direction, hidden, onClick, controls, className = '' }) {
  const { label, icon: Icon, nudge } = DIRECTIONS[direction]

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={hidden}
      aria-label={label}
      aria-controls={controls}
      className={`absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-apex-500 transition hover:text-apex-400 focus-visible:outline-2 focus-visible:outline-apex-400 disabled:pointer-events-none disabled:opacity-0 lg:size-14 ${nudge} ${className}`}
    >
      <span aria-hidden="true" className="absolute inset-1 rounded-full bg-apex-500/25 blur-lg" />
      <Icon className="relative size-8 drop-shadow-[0_0_10px_rgba(225,29,38,0.8)] lg:size-11" strokeWidth={1.75} />
    </button>
  )
}
