import { MARQUEE_ITEMS } from '@/data/features'

function MarqueeRow({ duplicate = false }) {
  return (
    <ul aria-hidden={duplicate || undefined} className="flex shrink-0 items-center">
      {MARQUEE_ITEMS.map((item) => (
        <li
          key={item}
          className="flex items-center gap-6 pr-6 font-display text-lg font-semibold whitespace-nowrap text-white/85 sm:text-xl"
        >
          {item}
          <span aria-hidden="true" className="size-2 rotate-45 rounded-[1px] bg-white/40" />
        </li>
      ))}
    </ul>
  )
}

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/6 bg-ink-900 py-5">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <MarqueeRow />
        <MarqueeRow duplicate />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-ink-900 sm:w-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-ink-900 sm:w-32"
      />
    </div>
  )
}
