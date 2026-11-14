import { useId, useState } from 'react'
import { Expand } from 'lucide-react'
import { AutoVideo } from '@/components/ui/AutoVideo'
import { Container } from '@/components/ui/Container'
import { Lightbox } from '@/components/ui/Lightbox'
import { PagerArrow, PagerDots } from '@/components/ui/Pager'
import { PluginPanel } from '@/components/ui/PluginPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Marked } from '@/components/ui/Sketch'
import { SHOWCASE_ROWS } from '@/data/media'
import { useSwipe } from '@/hooks/useSwipe'

const CLIP_SHIFT_PX = 24

const CORNER_BADGE_STYLE =
  'absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-lg border border-line bg-canvas text-fg transition hover:bg-apex-500 hover:text-white lg:opacity-0 lg:group-hover:opacity-100'
const FRAME_STYLE = 'relative overflow-hidden rounded-2xl bg-canvas shadow-hard outline outline-line'

const NUMBERED_ROWS = SHOWCASE_ROWS.reduce(
  ({ rows, count }, row) => ({
    rows: [...rows, row.map((media, index) => ({ media, figure: count + index + 1 }))],
    count: count + row.length,
  }),
  { rows: [], count: 0 },
).rows
const NUMBERED_MEDIA = NUMBERED_ROWS.flat()

const STAGE_RATIO = Math.min(...NUMBERED_MEDIA.map(({ media }) => media.width / media.height))

const figureLabel = (figure) => `Fig. ${String(figure).padStart(2, '0')}`

function ShowcaseMedia({ media, fill = false, onExpand }) {
  const expand = () => onExpand(media)
  const label = `Enlarge ${media.title}`

  if (media.type === 'video') {
    return (
      <>
        <AutoVideo media={media} fill={fill} />
        <button
          type="button"
          onClick={expand}
          aria-label={label}
          className={`${CORNER_BADGE_STYLE} focus-visible:outline-2 focus-visible:outline-fg lg:focus-visible:opacity-100`}
        >
          <Expand className="size-3.5" strokeWidth={2.5} />
        </button>
      </>
    )
  }

  return (
    <button
      type="button"
      onClick={expand}
      aria-label={label}
      className={`${fill ? 'absolute inset-0' : 'block w-full'} cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-fg`}
    >
      <img
        src={media.src}
        alt=""
        width={media.width}
        height={media.height}
        loading="lazy"
        className={fill ? 'size-full object-contain' : 'block h-auto w-full'}
      />
      <span aria-hidden="true" className={CORNER_BADGE_STYLE}>
        <Expand className="size-3.5" strokeWidth={2.5} />
      </span>
    </button>
  )
}

function FigureCaption({ media, figure, className = '' }) {
  return (
    <figcaption className={className}>
      <p className="font-mono text-xs font-bold tracking-wider text-apex-400 uppercase">{figureLabel(figure)}</p>
      {media.credit && (
        <p className="mt-1 text-fg-muted">
          Made by <span className="font-semibold text-fg">@{media.credit}</span>
        </p>
      )}
    </figcaption>
  )
}

function ShowcaseItem({ media, figure, onExpand }) {
  return (
    <figure
      style={{ '--grow': media.width / media.height }}
      className="reveal group flex min-w-0 flex-col lg:grow-(--grow) lg:basis-0"
    >
      <div
        className={`${FRAME_STYLE} transition duration-200 group-hover:-translate-1 group-hover:shadow-hard-lg motion-reduce:group-hover:translate-0`}
      >
        <ShowcaseMedia media={media} onExpand={onExpand} />
      </div>
      <FigureCaption media={media} figure={figure} className="mt-4" />
    </figure>
  )
}

function ShowcaseCarousel({ onExpand }) {
  const [{ index, direction }, setView] = useState({ index: 0, direction: 0 })
  const stageId = useId()
  const count = NUMBERED_MEDIA.length
  const { media, figure } = NUMBERED_MEDIA[index]

  const step = (delta) => setView((view) => ({ index: (view.index + delta + count) % count, direction: delta }))
  const showClip = (nextIndex) =>
    setView((view) => ({ index: nextIndex, direction: Math.sign(nextIndex - view.index) }))
  const swipe = useSwipe(step)

  return (
    <figure className="reveal lg:hidden">
      <div
        id={stageId}
        {...swipe}
        className={`${FRAME_STYLE} touch-pan-y bg-grid`}
        style={{ aspectRatio: STAGE_RATIO }}
      >
        <div
          key={media.title}
          className="absolute inset-0 animate-page-in motion-reduce:animate-none"
          style={{ '--page-shift': `${direction * CLIP_SHIFT_PX}px` }}
        >
          <ShowcaseMedia media={media} fill onExpand={onExpand} />
        </div>
        <PagerArrow
          direction={-1}
          label="Previous animation"
          controls={stageId}
          onStep={step}
          className="absolute top-1/2 left-2.5 -translate-y-1/2 pointer-coarse:hidden"
        />
        <PagerArrow
          direction={1}
          label="Next animation"
          controls={stageId}
          onStep={step}
          className="absolute top-1/2 right-2.5 -translate-y-1/2 pointer-coarse:hidden"
        />
      </div>
      <div className="mt-4 flex justify-center">
        <PagerDots
          count={count}
          current={index}
          label={(dot) => `Animation ${dot + 1} of ${count}`}
          controls={stageId}
          onSelect={showClip}
        />
      </div>
      <div aria-live="polite">
        <FigureCaption media={media} figure={figure} className="mt-3" />
      </div>
    </figure>
  )
}

export function Showcase() {
  const [expandedMedia, setExpandedMedia] = useState(null)

  return (
    <section id="showcase" className="py-8 sm:py-10">
      <Container>
        <PluginPanel title="Viewport" status="Click any clip to see it bigger.">
          <SectionHeading
            scene="01"
            eyebrow="Made with Apex Animator"
            title={
              <>
                Animated by <Marked>the community.</Marked>
              </>
            }
            description="Real animations from people using Apex Animator, captured straight out of Roblox Studio."
          />

          <div className="mt-14 flex flex-col gap-10 max-lg:hidden">
            {NUMBERED_ROWS.map((row) => (
              <div key={row.map(({ media }) => media.title).join()} className="flex gap-6">
                {row.map(({ media, figure }) => (
                  <ShowcaseItem key={media.title} media={media} figure={figure} onExpand={setExpandedMedia} />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-10 lg:hidden">
            <ShowcaseCarousel onExpand={setExpandedMedia} />
          </div>
        </PluginPanel>
      </Container>

      <Lightbox media={expandedMedia} onClose={() => setExpandedMedia(null)} />
    </section>
  )
}
