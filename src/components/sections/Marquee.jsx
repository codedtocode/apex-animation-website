import { Asterisk } from 'lucide-react'
import { MARQUEE_ITEMS } from '@/data/features'

const FREE_ITEMS = Array.from({ length: 8 }, () => 'Free forever')

function MarqueeRow({ items, separatorStyle, duplicate = false }) {
  return (
    <ul aria-hidden={duplicate || undefined} className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-center gap-5 pr-5 whitespace-nowrap">
          {item}
          <Asterisk aria-hidden="true" className={`size-6 ${separatorStyle}`} strokeWidth={3} />
        </li>
      ))}
    </ul>
  )
}

function Band({ items, separatorStyle, className, trackClassName = '' }) {
  return (
    <div
      className={`left-[-5%] w-[110%] overflow-hidden border-y-[3px] border-ink py-3 font-display text-xl font-black tracking-tight uppercase font-stretch-semi-expanded sm:py-4 sm:text-2xl ${className}`}
    >
      <div className={`flex w-max animate-marquee motion-reduce:animate-none ${trackClassName}`}>
        <MarqueeRow items={items} separatorStyle={separatorStyle} />
        <MarqueeRow items={items} separatorStyle={separatorStyle} duplicate />
      </div>
    </div>
  )
}

export function Marquee() {
  return (
    <div className="relative py-10 sm:py-14">
      <Band
        items={FREE_ITEMS}
        separatorStyle="text-ink"
        className="absolute top-1/2 -translate-y-1/2 rotate-[1.6deg] bg-apex-500 text-white"
        trackClassName="[animation-direction:reverse]"
      />
      <Band
        items={MARQUEE_ITEMS}
        separatorStyle="text-apex-500"
        className="relative -rotate-[1.4deg] bg-ink text-paper"
      />
    </div>
  )
}
