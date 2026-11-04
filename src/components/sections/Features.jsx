import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { PagerArrow, PagerDots } from '@/components/ui/Pager'
import { PluginPanel } from '@/components/ui/PluginPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { HandNote, SketchArrow } from '@/components/ui/Sketch'
import { FEATURE_TAGS, FEATURES } from '@/data/features'
import { prefersReducedMotion } from '@/lib/motion'
import { FeatureDialog } from './FeatureDialog'
import { FeatureTag } from './FeatureTag'

const ALL_FEATURES = 'all'
const PAGE_SIZE = 9
const PAGE_SHIFT_PX = 32
const FEATURE_LIST_ID = 'feature-list'
const RESIZE_MS = 450
const RESIZE_EASING = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const FEATURES_HASH = '#features'

const featureHref = ({ title }) =>
  `${FEATURES_HASH}/${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`
const FEATURES_BY_HREF = new Map(FEATURES.map((feature) => [featureHref(feature), feature]))
const featureFromHash = () => FEATURES_BY_HREF.get(window.location.hash) ?? null
const pageOf = (feature) => (feature ? Math.floor(FEATURES.indexOf(feature) / PAGE_SIZE) : 0)

function useLinkedFeature() {
  const [feature, setFeature] = useState(featureFromHash)
  const openedOnLoadRef = useRef(feature !== null)

  useEffect(() => {
    if (openedOnLoadRef.current) document.getElementById('features').scrollIntoView({ behavior: 'instant' })
    const followHash = () => {
      openedOnLoadRef.current = false
      setFeature(featureFromHash())
    }
    window.addEventListener('hashchange', followHash)
    return () => window.removeEventListener('hashchange', followHash)
  }, [])

  const unlinkFeature = () => {
    if (!featureFromHash()) return
    if (openedOnLoadRef.current) {
      openedOnLoadRef.current = false
      window.history.replaceState(null, '', FEATURES_HASH)
      setFeature(null)
    } else {
      window.history.back()
    }
  }

  return [feature, unlinkFeature]
}

const FILTERS = [
  { key: ALL_FEATURES, label: 'All', count: FEATURES.length },
  ...Object.entries(FEATURE_TAGS).map(([key, label]) => ({
    key,
    label,
    count: FEATURES.filter((feature) => feature.tag === key).length,
  })),
]

function FilterButton({ filter, active, onSelect }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(filter.key)}
      className={`inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg ${
        active ? 'bg-select text-white' : 'text-fg-muted hover:bg-surface-raised hover:text-fg'
      }`}
    >
      {filter.label}
      <span className={`tabular-nums ${active ? 'text-white/70' : 'text-fg-faint'}`}>{filter.count}</span>
    </button>
  )
}

function PreviewNote() {
  return (
    <div
      aria-hidden="true"
      className="reveal pointer-events-none absolute right-[12%] bottom-full mb-8 hidden items-start gap-1 xl:flex"
    >
      <SketchArrow className="mt-2 h-12 w-18 rotate-110 text-apex-500" />
      <HandNote className="-rotate-3 text-[2rem]">click to preview!</HandNote>
    </div>
  )
}

function PageArrow({ direction, ...props }) {
  return (
    <PagerArrow
      direction={direction}
      label={direction < 0 ? 'Previous features' : 'Next features'}
      controls={FEATURE_LIST_ID}
      {...props}
    />
  )
}

const openLabel = (clips) => {
  if (!clips) return 'See details'
  return clips.length > 1 ? `Watch ${clips.length} demos` : 'Watch demo'
}

function FeatureCard({ feature }) {
  const { title, description, tag, icon: Icon, clips } = feature
  const OpenIcon = clips ? Play : ArrowRight

  return (
    <li className="group relative flex flex-col rounded-2xl border border-line bg-surface p-6 transition duration-200 hover:-translate-1 has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-fg motion-reduce:hover:translate-0">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-xl border border-line bg-surface-raised transition-colors group-hover:bg-apex-500 group-hover:text-white">
          <Icon className="size-5.5" strokeWidth={2} />
        </span>
        <FeatureTag tag={tag} />
      </div>
      <h3 className="mt-6 font-display text-xl font-extrabold font-stretch-semi-expanded">
        <a
          href={featureHref(feature)}
          aria-haspopup="dialog"
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
        >
          {title}
        </a>
      </h3>
      <p className="mt-2 leading-relaxed text-fg-muted">{description}</p>
      <span
        aria-hidden="true"
        className="mt-auto flex items-center gap-1.5 pt-5 font-mono text-xs font-bold tracking-wider text-fg-faint uppercase transition-colors group-hover:text-apex-400"
      >
        <OpenIcon className={`size-3.5 ${clips ? 'fill-current' : ''}`} strokeWidth={2.5} />
        {openLabel(clips)}
      </span>
    </li>
  )
}

export function Features() {
  const [linkedFeature, unlinkFeature] = useLinkedFeature()
  const [activeFilter, setActiveFilter] = useState(ALL_FEATURES)
  const [page, setPage] = useState(() => pageOf(linkedFeature))
  const [direction, setDirection] = useState(0)
  const pagerRef = useRef(null)
  const listRef = useRef(null)
  const startHeightRef = useRef(null)

  const visibleFeatures =
    activeFilter === ALL_FEATURES ? FEATURES : FEATURES.filter((feature) => feature.tag === activeFilter)
  const pages = Array.from({ length: Math.ceil(visibleFeatures.length / PAGE_SIZE) }, (_, index) =>
    visibleFeatures.slice(index * PAGE_SIZE, (index + 1) * PAGE_SIZE),
  )
  const pageCount = pages.length
  const firstIndex = page * PAGE_SIZE

  useLayoutEffect(() => {
    const list = listRef.current
    const startHeight = startHeightRef.current
    const endHeight = list.offsetHeight
    startHeightRef.current = null
    if (startHeight === null || startHeight === endHeight || prefersReducedMotion()) return
    list.animate(
      { height: [`${startHeight}px`, `${endHeight}px`], overflowY: ['clip', 'clip'] },
      { duration: RESIZE_MS, easing: RESIZE_EASING },
    )
  }, [activeFilter, page])

  const rememberHeight = () => {
    startHeightRef.current = listRef.current.offsetHeight
  }

  const selectFilter = (key) => {
    rememberHeight()
    setActiveFilter(key)
    setPage(0)
    setDirection(0)
  }

  const showPage = (nextPage) => {
    rememberHeight()
    setDirection(Math.sign(nextPage - page))
    setPage(nextPage)
    const pager = pagerRef.current
    if (pager.getBoundingClientRect().top < parseFloat(getComputedStyle(pager).scrollMarginTop)) {
      pager.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'instant' : 'smooth' })
    }
  }

  const step = (delta) => showPage(page + delta)

  return (
    <section id="features" className="py-8 sm:py-10">
      <Container>
        <PluginPanel
          title="Tools"
          toolbar={
            <div role="group" aria-label="Filter features" className="flex flex-wrap gap-1">
              {FILTERS.map((filter) => (
                <FilterButton
                  key={filter.key}
                  filter={filter}
                  active={filter.key === activeFilter}
                  onSelect={selectFilter}
                />
              ))}
            </div>
          }
          status={`Showing ${firstIndex + 1}–${firstIndex + pages[page].length} of ${visibleFeatures.length} tools.`}
          bodyClassName="lg:px-18"
        >
          <SectionHeading
            scene="02"
            eyebrow="Features"
            title="A full animation studio, right inside Roblox Studio."
            description="Every tool is tagged by how it plays. Native features bake down to standard Roblox animations. Engine features use the optional ApexEngine runtime for cinematic extras."
          />

          <div ref={pagerRef} className="mt-14 scroll-mt-32">
            <div className="relative">
              <PreviewNote />
              <div ref={listRef} id={FEATURE_LIST_ID}>
                <ul
                  key={`${activeFilter}-${page}`}
                  className="grid animate-page-in gap-6 motion-reduce:animate-none sm:grid-cols-2 lg:grid-cols-3"
                  style={{ '--page-shift': `${direction * PAGE_SHIFT_PX}px` }}
                >
                  {pages[page].map((feature) => (
                    <FeatureCard key={feature.title} feature={feature} />
                  ))}
                </ul>
              </div>
              {pageCount > 1 && (
                <>
                  <div className="absolute inset-y-0 -left-14 flex items-center max-lg:hidden">
                    <PageArrow direction={-1} disabled={page === 0} onStep={step} />
                  </div>
                  <div className="absolute inset-y-0 -right-14 flex items-center max-lg:hidden">
                    <PageArrow direction={1} disabled={page === pageCount - 1} onStep={step} />
                  </div>
                </>
              )}
            </div>
            {pageCount > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <PageArrow direction={-1} disabled={page === 0} onStep={step} className="lg:hidden" />
                <PagerDots
                  count={pageCount}
                  current={page}
                  label={(index) => `Features page ${index + 1} of ${pageCount}`}
                  controls={FEATURE_LIST_ID}
                  onSelect={showPage}
                />
                <PageArrow direction={1} disabled={page === pageCount - 1} onStep={step} className="lg:hidden" />
              </div>
            )}
          </div>
        </PluginPanel>
      </Container>

      <FeatureDialog feature={linkedFeature} onClose={unlinkFeature} />
    </section>
  )
}
