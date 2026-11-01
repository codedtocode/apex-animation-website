import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FEATURE_TAGS, FEATURES } from '@/data/features'
import { LINKS } from '@/data/site'

const ALL_FEATURES = 'all'

const FILTERS = [
  { key: ALL_FEATURES, label: 'All', count: FEATURES.length },
  ...Object.entries(FEATURE_TAGS).map(([key, label]) => ({
    key,
    label,
    count: FEATURES.filter((feature) => feature.tag === key).length,
  })),
]

const TAG_STYLES = {
  native: 'bg-canvas text-fg',
  hybrid: 'bg-surface-raised text-fg',
  engine: 'bg-fg text-canvas',
}

function TagChip({ tag }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${TAG_STYLES[tag]}`}
    >
      {FEATURE_TAGS[tag]}
    </span>
  )
}

function FilterButton({ filter, active, onSelect }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(filter.key)}
      className={`inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs font-bold tracking-wider uppercase transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg ${
        active
          ? 'bg-fg text-canvas shadow-[4px_4px_0_var(--color-apex-500)]'
          : 'bg-surface hover:-translate-0.5 hover:shadow-hard-sm'
      }`}
    >
      {filter.label}
      <span className={`tabular-nums ${active ? 'text-apex-500' : 'text-fg-faint'}`}>[{filter.count}]</span>
    </button>
  )
}

function FeatureCard({ feature: { title, description, tag, icon: Icon } }) {
  return (
    <li className="group rounded-2xl border border-line bg-surface p-6 shadow-hard transition duration-200 hover:-translate-1 hover:shadow-hard-lg motion-reduce:hover:translate-0">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-xl border border-line bg-surface-raised transition-colors group-hover:bg-apex-500 group-hover:text-white">
          <Icon className="size-5.5" strokeWidth={2} />
        </span>
        <TagChip tag={tag} />
      </div>
      <h3 className="mt-6 font-display text-xl font-extrabold font-stretch-semi-expanded">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{description}</p>
    </li>
  )
}

function MoreFeaturesCard() {
  return (
    <li className="relative flex flex-col justify-between gap-6 rounded-2xl border border-dashed border-line p-6 sm:flex-row sm:items-end lg:col-span-2">
      <div>
        <h3 className="font-hand text-4xl leading-none font-bold text-apex-500">and much more&hellip;</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-muted">
          Takes, a Poses library, reference images, recovery copies, floating windows and a What&rsquo;s New window to
          keep you in the loop.
        </p>
      </div>
      <ExternalLink
        href={LINKS.devforum}
        className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-line bg-surface px-3.5 py-2 font-mono text-xs font-bold tracking-wider uppercase shadow-hard-sm transition hover:-translate-0.5 hover:shadow-hard focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg sm:self-end"
      >
        Full feature list
        <ArrowUpRight className="size-4" strokeWidth={2.5} />
      </ExternalLink>
    </li>
  )
}

export function Features() {
  const [activeFilter, setActiveFilter] = useState(ALL_FEATURES)
  const showingAll = activeFilter === ALL_FEATURES
  const visibleFeatures = showingAll ? FEATURES : FEATURES.filter((feature) => feature.tag === activeFilter)

  return (
    <section id="features" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            scene="02"
            eyebrow="Features"
            title="A full animation studio, right inside Roblox Studio."
            description="Every tool is tagged by how it plays. Native features bake down to standard Roblox animations. Engine features use the optional ApexEngine runtime for cinematic extras."
          />

          <div role="group" aria-label="Filter features" className="reveal flex flex-wrap gap-2.5">
            {FILTERS.map((filter) => (
              <FilterButton
                key={filter.key}
                filter={filter}
                active={filter.key === activeFilter}
                onSelect={setActiveFilter}
              />
            ))}
          </div>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleFeatures.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
          {showingAll && <MoreFeaturesCard />}
        </ul>
      </Container>
    </section>
  )
}
