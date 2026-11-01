import { Star } from 'lucide-react'

const MAX_STARS = 5

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export function StarRating({ percent }) {
  const stars = (percent / 100) * MAX_STARS

  return (
    <span aria-hidden="true" className="flex gap-0.5">
      {Array.from({ length: MAX_STARS }, (_, index) => (
        <span key={index} className="relative size-4">
          <Star className="absolute inset-0 size-4 fill-ink/15" strokeWidth={0} />
          <span
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${clamp(stars - index, 0, 1) * 100}%` }}
          >
            <Star className="size-4 fill-apex-500" strokeWidth={0} />
          </span>
        </span>
      ))}
    </span>
  )
}
