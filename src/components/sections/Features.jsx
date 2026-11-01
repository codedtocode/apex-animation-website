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
  native: 'bg-transparent text-ink-300 ring-white/15',
  hybrid: 'bg-white/12 text-white ring-white/25',
  engine: 'bg-white text-ink-950 ring-white',
}

function TagChip({ tag }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${TAG_STYLES[tag]}`}
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
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        active
          ? 'bg-white text-ink-950'
          : 'bg-white/5 text-ink-300 ring-1 ring-white/10 hover:bg-white/10 hover:text-white'
      }`}
    >
      {filter.label}
      <span className="text-xs text-ink-500 tabular-nums">{filter.count}</span>
    </button>
  )
}

function FeatureCard({ feature: { title, description, tag, icon: Icon } }) {
  return (
    <li className="group relative overflow-hidden rounded-2xl border border-white/6 bg-ink-900 p-6 transition duration-300 hover:-translate-y-0.5 hover:border-white/20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-white/0 blur-3xl transition duration-500 group-hover:bg-white/8"
      />
      <div className="relative flex items-start justify-between gap-4">
        <span className="grid size-11 place-items-center rounded-xl bg-white/5 text-white ring-1 ring-white/10">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <TagChip tag={tag} />
      </div>
      <h3 className="relative mt-5 font-display text-lg font-semibold">{title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-ink-300">{description}</p>
    </li>
  )
}

function MoreFeaturesCard() {
  return (
    <li className="flex flex-col justify-between gap-6 rounded-2xl border border-dashed border-white/15 bg-linear-to-br from-white/5 to-transparent p-6 sm:flex-row sm:items-end lg:col-span-2">
      <div>
        <h3 className="font-display text-lg font-semibold">And much more</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-300">
          Takes, a Poses library, reference images, recovery copies, floating windows and a What&rsquo;s New window to
          keep you in the loop.
        </p>
      </div>
      <ExternalLink
        href={LINKS.devforum}
        className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white transition hover:text-ink-300"
      >
        Full feature list
        <ArrowUpRight className="size-4" />
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
            eyebrow="Features"
            title="A full animation studio, right inside Roblox Studio."
            description="Every tool is tagged by how it plays. Native features bake down to standard Roblox animations. Engine features use the optional ApexEngine runtime for cinematic extras."
          />

          <div role="group" aria-label="Filter features" className="reveal flex flex-wrap gap-2">
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

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleFeatures.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
          {showingAll && <MoreFeaturesCard />}
        </ul>
      </Container>
    </section>
  )
}
