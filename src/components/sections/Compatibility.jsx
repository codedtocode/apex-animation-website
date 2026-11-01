import { Minus } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SketchCheck } from '@/components/ui/Sketch'
import { COMPATIBILITY } from '@/data/features'

function StatusBox({ supported }) {
  if (supported) {
    return (
      <span className="grid size-8 shrink-0 place-items-center border-2 border-ink bg-paper">
        <SketchCheck className="size-6 text-apex-500" />
      </span>
    )
  }
  return (
    <span className="grid size-8 shrink-0 place-items-center border-2 border-dashed border-ink-faint text-ink-faint">
      <Minus className="size-4" strokeWidth={3} />
    </span>
  )
}

function CompatibilityItem({ item: { label, detail, supported } }) {
  return (
    <li
      className={`flex gap-4 border-2 p-5 ${
        supported ? 'border-ink bg-paper-light shadow-hard-sm' : 'border-dashed border-ink-faint'
      }`}
    >
      <StatusBox supported={supported} />
      <div>
        <h3
          className={`font-display font-extrabold font-stretch-semi-expanded ${supported ? '' : 'text-ink-faint line-through decoration-2'}`}
        >
          {label}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{detail}</p>
      </div>
    </li>
  )
}

export function Compatibility() {
  return (
    <section id="compatibility" className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          scene="04"
          eyebrow="Compatibility"
          title="Works with the rigs you already have."
          description="Open a place, select a rig and start animating. Coming from Moon Animator? Bring your exported animations with you."
        />
        <ul className="reveal grid gap-4 sm:grid-cols-2">
          {COMPATIBILITY.map((item) => (
            <CompatibilityItem key={item.label} item={item} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
