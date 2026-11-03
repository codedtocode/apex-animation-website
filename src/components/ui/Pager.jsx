import { ChevronLeft, ChevronRight } from 'lucide-react'

export function PagerArrow({ direction, label, controls, disabled, onStep, className = '' }) {
  const Icon = direction < 0 ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      aria-label={label}
      aria-controls={controls}
      disabled={disabled}
      onClick={() => onStep(direction)}
      className={`grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface transition-colors hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg disabled:pointer-events-none disabled:opacity-30 ${className}`}
    >
      <Icon className="size-5" strokeWidth={2.5} />
    </button>
  )
}

export function PagerDots({ count, current, label, controls, onSelect }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={label(index)}
          aria-current={index === current ? 'true' : undefined}
          aria-controls={controls}
          onClick={() => onSelect(index)}
          className="group grid place-items-center p-1.5 focus-visible:outline-2 focus-visible:outline-fg"
        >
          <span
            className={`block h-2 rounded-full transition-all ${
              index === current ? 'w-6 bg-fg' : 'w-2 bg-fg-faint group-hover:bg-fg-muted'
            }`}
          />
        </button>
      ))}
    </div>
  )
}
