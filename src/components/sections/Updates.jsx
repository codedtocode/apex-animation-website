import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { PluginPanel } from '@/components/ui/PluginPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { UPDATE_PILLARS } from '@/data/updates'
import { UpdateTrack } from './UpdateTrack'

const CARD_STYLE = 'w-full rounded-2xl border border-line bg-surface p-6'

function PillarContent({ pillar: { icon: Icon, title, text }, linked }) {
  return (
    <>
      <span className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl border border-apex-500 text-apex-400">
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
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{text}</p>
    </>
  )
}

function PillarCard({ pillar }) {
  if (pillar.href) {
    return (
      <ExternalLink
        href={pillar.href}
        className={`group block ${CARD_STYLE} shadow-[5px_5px_0_var(--color-apex-500)] transition hover:-translate-1 hover:shadow-[9px_9px_0_var(--color-apex-500)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg motion-reduce:hover:translate-0`}
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
    <section id="updates" className="py-8 sm:py-10">
      <Container>
        <PluginPanel title="What's New" status="Every update is documented on the DevForum.">
          <SectionHeading
            scene="05"
            centered
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
        </PluginPanel>
      </Container>
    </section>
  )
}
