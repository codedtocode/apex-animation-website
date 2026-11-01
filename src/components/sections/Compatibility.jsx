import { Minus } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { PluginPanel } from '@/components/ui/PluginPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SketchCheck } from '@/components/ui/Sketch'
import { COMPATIBILITY } from '@/data/features'

function StatusBox({ supported }) {
  if (supported) {
    return (
      <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-surface-raised">
        <SketchCheck className="size-6 text-apex-500" />
      </span>
    )
  }
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-dashed border-fg-faint text-fg-faint">
      <Minus className="size-4" strokeWidth={3} />
    </span>
  )
}

function CompatibilityItem({ item: { label, detail, supported } }) {
  return (
    <li
      className={`flex gap-4 rounded-2xl border p-5 ${
        supported ? 'border-line bg-surface shadow-hard-sm' : 'border-dashed border-fg-faint'
      }`}
    >
      <StatusBox supported={supported} />
      <div>
        <h3
          className={`font-display font-extrabold font-stretch-semi-expanded ${supported ? '' : 'text-fg-faint line-through decoration-2'}`}
        >
          {label}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-fg-muted">{detail}</p>
      </div>
    </li>
  )
}

const SUPPORTED_COUNT = COMPATIBILITY.filter(({ supported }) => supported).length

export function Compatibility() {
  return (
    <section id="compatibility" className="py-8 sm:py-10">
      <Container>
        <PluginPanel
          title="Rig check"
          status={`${SUPPORTED_COUNT} of ${COMPATIBILITY.length} supported.`}
          bodyClassName="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        >
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
        </PluginPanel>
      </Container>
    </section>
  )
}
