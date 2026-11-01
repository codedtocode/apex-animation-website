import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { UPDATE_PILLARS } from '@/data/updates'
import { UpdateTrack } from './UpdateTrack'

const CARD_STYLE = 'w-full border-2 border-paper bg-ink p-6'

function PillarContent({ pillar: { icon: Icon, title, text }, linked }) {
  return (
    <>
      <span className="flex items-start justify-between">
        <span className="grid size-11 place-items-center border-2 border-apex-500 text-apex-400">
          <Icon className="size-5" strokeWidth={2} />
        </span>
        {linked && (
          <ArrowUpRight
            className="size-6 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-apex-400"
            strokeWidth={2.5}
          />
        )}
      </span>
      <h3 className="mt-5 font-display text-lg leading-snug font-extrabold font-stretch-semi-expanded">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-paper/70">{text}</p>
    </>
  )
}

function PillarCard({ pillar }) {
  if (pillar.href) {
    return (
      <ExternalLink
        href={pillar.href}
        className={`group block ${CARD_STYLE} shadow-[5px_5px_0_var(--color-apex-500)] transition hover:-translate-1 hover:shadow-[9px_9px_0_var(--color-apex-500)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper motion-reduce:hover:translate-0`}
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
    <section
      id="updates"
      className="relative overflow-hidden border-y-[3px] border-ink bg-ink py-24 text-paper sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid" />
      <Container className="relative">
        <SectionHeading
          scene="05"
          centered
          inverted
          eyebrow="Updates"
          title="Shipping fast."
          description="Apex is actively maintained. Its developer works hard and fast to ship community feature requests and bug fixes in frequent updates."
        />

        <div className="reveal mx-auto mt-14 max-w-4xl">
          <UpdateTrack />
          <ul className="mt-16 grid gap-6 sm:grid-cols-3">
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
