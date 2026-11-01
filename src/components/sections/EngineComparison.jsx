import { Check, Cpu } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { HandNote, SketchArrow } from '@/components/ui/Sketch'
import { ENGINE_BENEFITS, NATIVE_BENEFITS } from '@/data/features'
import mark from '@images/apexanimator-mono-512.png'

function PlanCard({ tone, children }) {
  return (
    <article className="reveal">
      <div
        className={`h-full border-[3px] border-ink p-8 transition duration-200 hover:-translate-1.5 hover:shadow-[15px_15px_0_var(--color-apex-500)] motion-reduce:hover:translate-0 sm:p-10 ${tone}`}
      >
        {children}
      </div>
    </article>
  )
}

function BenefitList({ benefits, checkStyle, textStyle }) {
  return (
    <ul className="mt-8 space-y-4">
      {benefits.map((benefit) => (
        <li key={benefit} className={`flex gap-3 text-sm leading-relaxed sm:text-base ${textStyle}`}>
          <span className={`mt-0.5 grid size-5.5 shrink-0 place-items-center border-2 ${checkStyle}`}>
            <Check className="size-3.5" strokeWidth={3.5} />
          </span>
          {benefit}
        </li>
      ))}
    </ul>
  )
}

function PlanHeader({ icon, title, subtitle, iconStyle, subtitleStyle }) {
  return (
    <div className="flex items-center gap-4">
      <span className={`grid size-14 place-items-center border-2 ${iconStyle}`}>{icon}</span>
      <div>
        <h3 className="font-display text-2xl font-black uppercase font-stretch-semi-expanded">{title}</h3>
        <p className={`font-mono text-xs font-bold tracking-wider uppercase ${subtitleStyle}`}>{subtitle}</p>
      </div>
    </div>
  )
}

function NativePlan() {
  return (
    <PlanCard tone="bg-paper-light shadow-hard-lg">
      <PlanHeader
        icon={<img src={mark} alt="" width="32" height="32" className="size-8" />}
        title="Native"
        subtitle="Standard Roblox animations"
        iconStyle="border-ink bg-paper"
        subtitleStyle="text-ink-muted"
      />
      <BenefitList benefits={NATIVE_BENEFITS} checkStyle="border-ink bg-paper" textStyle="text-ink" />
    </PlanCard>
  )
}

function EnginePlan() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="reveal pointer-events-none absolute -top-16 right-2 hidden items-end gap-1 sm:flex"
      >
        <HandNote className="mb-5 rotate-2">totally optional!</HandNote>
        <SketchArrow className="h-12 w-16 rotate-[70deg] text-apex-500" />
      </div>
      <PlanCard tone="bg-ink text-paper shadow-hard-red">
        <PlanHeader
          icon={<Cpu className="size-7" strokeWidth={2} />}
          title="ApexEngine"
          subtitle="Optional runtime"
          iconStyle="border-paper bg-apex-500 text-white"
          subtitleStyle="text-apex-400"
        />
        <BenefitList
          benefits={ENGINE_BENEFITS}
          checkStyle="border-apex-500 bg-apex-500 text-white"
          textStyle="text-paper/85"
        />
      </PlanCard>
    </div>
  )
}

export function EngineComparison() {
  return (
    <section id="engine" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          scene="03"
          centered
          eyebrow="Native + ApexEngine"
          title="Native by default. Cinematic when you want it."
          description="You never need the engine to ship an animation. Add ApexEngine when you want scenes, sound and effects to play exactly as you built them."
        />
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <NativePlan />
          <EnginePlan />
        </div>
      </Container>
    </section>
  )
}
