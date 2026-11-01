import { SketchArrow } from './Sketch'

const DIRECTIONS = {
  previous: { label: 'Previous', flip: '-scale-x-100', nudge: 'hover:-translate-x-1' },
  next: { label: 'Next', flip: '', nudge: 'hover:translate-x-1' },
}

export function CarouselArrow({ direction, hidden, onClick, controls, className = '' }) {
  const { label, flip, nudge } = DIRECTIONS[direction]

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={hidden}
      aria-label={label}
      aria-controls={controls}
      className={`group absolute top-1/2 z-10 grid h-10 w-12 -translate-y-1/2 place-items-center transition focus-visible:outline-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-0 lg:h-14 lg:w-16 ${nudge} ${className}`}
    >
      <span className={`relative block size-full ${flip}`}>
        <SketchArrow shape="straight" strokeWidth={4.5} className="absolute inset-0 translate-0.75 text-ink" />
        <SketchArrow
          shape="straight"
          strokeWidth={4.5}
          className="absolute inset-0 text-apex-500 transition-colors group-hover:text-apex-400"
        />
      </span>
    </button>
  )
}
