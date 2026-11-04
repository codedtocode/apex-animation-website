import { useState } from 'react'
import { Expand } from 'lucide-react'
import { AutoVideo } from '@/components/ui/AutoVideo'
import { Container } from '@/components/ui/Container'
import { Lightbox } from '@/components/ui/Lightbox'
import { PluginPanel } from '@/components/ui/PluginPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Marked } from '@/components/ui/Sketch'
import { SHOWCASE_ROWS } from '@/data/media'

const CORNER_BADGE_STYLE =
  'absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-lg border border-line bg-canvas text-fg transition hover:bg-apex-500 hover:text-white lg:opacity-0 lg:group-hover:opacity-100'

const NUMBERED_ROWS = SHOWCASE_ROWS.reduce(
  ({ rows, count }, row) => ({
    rows: [...rows, row.map((media, index) => ({ media, figure: count + index + 1 }))],
    count: count + row.length,
  }),
  { rows: [], count: 0 },
).rows

const figureLabel = (figure) => `Fig. ${String(figure).padStart(2, '0')}`

function ShowcaseMedia({ media, onExpand }) {
  const expand = () => onExpand(media)
  const label = `Enlarge ${media.title}`

  if (media.type === 'video') {
    return (
      <>
        <AutoVideo media={media} />
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
      className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-fg"
    >
      <img
        src={media.src}
        alt=""
        width={media.width}
        height={media.height}
        loading="lazy"
        className="block h-auto w-full"
      />
      <span aria-hidden="true" className={CORNER_BADGE_STYLE}>
        <Expand className="size-3.5" strokeWidth={2.5} />
      </span>
    </button>
  )
}

function ShowcaseItem({ media, figure, onExpand }) {
  return (
    <figure
      style={{ '--grow': media.width / media.height }}
      className="reveal group flex min-w-0 flex-col lg:grow-(--grow) lg:basis-0"
    >
      <div className="relative overflow-hidden rounded-2xl bg-canvas shadow-hard outline outline-line transition duration-200 group-hover:-translate-1 group-hover:shadow-hard-lg motion-reduce:group-hover:translate-0">
        <ShowcaseMedia media={media} onExpand={onExpand} />
      </div>
      <figcaption className="mt-4">
        <p className="font-mono text-xs font-bold tracking-wider text-apex-400 uppercase">{figureLabel(figure)}</p>
        <h3 className="mt-1 font-display text-xl font-extrabold font-stretch-semi-expanded">{media.title}</h3>
        <p className="mt-1.5 leading-relaxed text-fg-muted">{media.description}</p>
      </figcaption>
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
            eyebrow="See it in action"
            title={
              <>
                Real tools, captured in <Marked>Roblox Studio.</Marked>
              </>
            }
            description="No mockups. Every clip below is the actual plugin, running live."
          />

          <div className="mt-14 flex flex-col gap-12 lg:gap-10">
            {NUMBERED_ROWS.map((row) => (
              <div
                key={row.map(({ media }) => media.title).join()}
                className="flex flex-col gap-12 lg:flex-row lg:gap-6"
              >
                {row.map(({ media, figure }) => (
                  <ShowcaseItem key={media.title} media={media} figure={figure} onExpand={setExpandedMedia} />
                ))}
              </div>
            ))}
          </div>
        </PluginPanel>
      </Container>

      <Lightbox media={expandedMedia} onClose={() => setExpandedMedia(null)} />
    </section>
  )
}
