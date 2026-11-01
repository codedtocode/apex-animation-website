import { Check, Minus } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { COMPATIBILITY } from '@/data/features'

function CompatibilityItem({ item: { label, detail, supported } }) {
  const StatusIcon = supported ? Check : Minus

  return (
    <li
      className={`flex gap-4 rounded-2xl border p-5 ${
        supported ? 'border-white/6 bg-ink-900' : 'border-dashed border-white/10 bg-transparent'
      }`}
    >
      <span
        className={`grid size-8 shrink-0 place-items-center rounded-lg ${
          supported ? 'bg-white/10 text-white' : 'bg-white/5 text-ink-500'
        }`}
      >
        <StatusIcon className="size-4" strokeWidth={2.5} />
      </span>
      <div>
        <h3 className={`font-semibold ${supported ? 'text-white' : 'text-ink-400'}`}>{label}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-400">{detail}</p>
      </div>
    </li>
  )
}

export function Compatibility() {
  return (
    <section id="compatibility" className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          eyebrow="Compatibility"
          title="Works with the rigs you already have."
          description="Open a place, select a rig and start animating. Coming from Moon Animator? Bring your exported animations with you."
        />
        <ul className="reveal grid gap-3 sm:grid-cols-2">
          {COMPATIBILITY.map((item) => (
            <CompatibilityItem key={item.label} item={item} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
