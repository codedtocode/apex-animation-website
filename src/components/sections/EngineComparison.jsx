import { Check, Cpu } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { GlowBorderCard } from '@/components/ui/GlowBorderCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ENGINE_BENEFITS, NATIVE_BENEFITS } from '@/data/features'
import markMono from '@images/apexanimator-mono-branco-512.png'

function BenefitList({ benefits, checkStyle }) {
  return (
    <ul className="mt-8 space-y-4">
      {benefits.map((benefit) => (
        <li key={benefit} className="flex gap-3 text-sm leading-relaxed text-ink-200 sm:text-base">
          <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${checkStyle}`}>
            <Check className="size-3" strokeWidth={3} />
          </span>
          {benefit}
        </li>
      ))}
    </ul>
  )
}

function PlanHeader({ icon, title, subtitle, iconStyle, subtitleStyle }) {
  return (
    <div className="relative flex items-center gap-4">
      <span className={`grid size-12 place-items-center rounded-2xl ${iconStyle}`}>{icon}</span>
      <div>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <p className={`text-sm ${subtitleStyle}`}>{subtitle}</p>
      </div>
    </div>
  )
}

function NativePlan() {
  return (
    <GlowBorderCard className="reveal">
      <PlanHeader
        icon={<img src={markMono} alt="" width="28" height="28" className="size-7" />}
        title="Native"
        subtitle="Standard Roblox animations"
        iconStyle="bg-white/6 ring-1 ring-white/10"
        subtitleStyle="text-ink-400"
      />
      <BenefitList benefits={NATIVE_BENEFITS} checkStyle="bg-white/10 text-white" />
    </GlowBorderCard>
  )
}

function EnginePlan() {
  return (
    <GlowBorderCard className="reveal" restingBorder="bg-linear-to-br from-white/40 via-white/10 to-white/5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 size-72 rounded-full bg-white/8 blur-3xl"
      />
      <PlanHeader
        icon={<Cpu className="size-6" strokeWidth={1.75} />}
        title="ApexEngine"
        subtitle="Optional runtime"
        iconStyle="bg-white text-ink-950 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.4)]"
        subtitleStyle="text-ink-300"
      />
      <div className="relative">
        <BenefitList benefits={ENGINE_BENEFITS} checkStyle="bg-white text-ink-950" />
      </div>
    </GlowBorderCard>
  )
}

export function EngineComparison() {
  return (
    <section id="engine" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-120 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_65%)]"
      />
      <Container className="relative">
        <SectionHeading
          centered
          eyebrow="Native + ApexEngine"
          title="Native by default. Cinematic when you want it."
          description="You never need the engine to ship an animation. Add ApexEngine when you want scenes, sound and effects to play exactly as you built them."
        />
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <NativePlan />
          <EnginePlan />
        </div>
      </Container>
    </section>
  )
}
