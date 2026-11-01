import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { UPDATE_PILLARS } from '@/data/updates'
import { UpdateTrack } from './UpdateTrack'

const CARD_STYLE = 'w-full rounded-2xl border border-white/8 bg-ink-950/80 p-6'

function PillarContent({ pillar: { icon: Icon, title, text }, linked }) {
  return (
    <>
      <span className="flex items-start justify-between">
        <span className="grid size-10 place-items-center rounded-xl bg-apex-500/12 text-apex-400 ring-1 ring-apex-500/25">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        {linked && (
          <ArrowUpRight className="size-5 text-ink-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
        )}
      </span>
      <h3 className="mt-4 font-display font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-300">{text}</p>
    </>
  )
}

function PillarCard({ pillar }) {
  if (pillar.href) {
    return (
      <ExternalLink
        href={pillar.href}
        className={`group block ${CARD_STYLE} transition hover:border-white/25 hover:bg-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
      >
        <PillarContent pillar={pillar} linked />
      </ExternalLink>
    )
  }
  return (
    <div className={CARD_STYLE}>
      <PillarContent pillar={pillar} />
    </div>
  )
}

export function Updates() {
  return (
    <section id="updates" className="relative overflow-hidden border-y border-white/6 bg-ink-900/60 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid mask-[linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)] opacity-60"
      />
      <Container className="relative">
        <SectionHeading
          centered
          eyebrow="Updates"
          title="Shipping fast."
          description="Apex is actively maintained. Its developer works hard and fast to ship community feature requests and bug fixes in frequent updates."
        />

        <div className="reveal mx-auto mt-14 max-w-4xl">
          <UpdateTrack />
          <ul className="mt-14 grid gap-4 sm:grid-cols-3">
            {UPDATE_PILLARS.map((pillar) => (
              <li key={pillar.title} className="flex">
                <PillarCard pillar={pillar} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
