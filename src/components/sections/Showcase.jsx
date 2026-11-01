import { useState } from 'react'
import { Expand } from 'lucide-react'
import { AutoVideo } from '@/components/ui/AutoVideo'
import { Container } from '@/components/ui/Container'
import { Lightbox } from '@/components/ui/Lightbox'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SHOWCASE_ROWS } from '@/data/media'

const CORNER_BADGE_STYLE =
  'absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-lg bg-black/65 text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-black/85 lg:opacity-0 lg:group-hover:opacity-100'

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
          className={`${CORNER_BADGE_STYLE} focus-visible:outline-2 focus-visible:outline-white lg:focus-visible:opacity-100`}
        >
          <Expand className="size-3.5" />
        </button>
      </>
    )
  }

  return (
    <button
      type="button"
      onClick={expand}
      aria-label={label}
      className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
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
        <Expand className="size-3.5" />
      </span>
    </button>
  )
}

function ShowcaseItem({ media, onExpand }) {
  return (
    <figure
      style={{ '--grow': media.width / media.height }}
      className="reveal group flex min-w-0 flex-col lg:grow-(--grow) lg:basis-0"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/8 bg-ink-900 transition duration-300 group-hover:border-white/20">
        <ShowcaseMedia media={media} onExpand={onExpand} />
      </div>
      <figcaption className="mt-3.5">
        <h3 className="font-display font-semibold">{media.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-400">{media.description}</p>
      </figcaption>
    </figure>
  )
}

export function Showcase() {
  const [expandedMedia, setExpandedMedia] = useState(null)

  return (
    <section id="showcase" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="See it in action"
          title="Real tools, captured in Roblox Studio."
          description="No mockups. Every clip below is the actual plugin, running live."
        />

        <div className="mt-14 flex flex-col gap-10 lg:gap-8">
          {SHOWCASE_ROWS.map((row) => (
            <div key={row.map((media) => media.title).join()} className="flex flex-col gap-10 lg:flex-row lg:gap-5">
              {row.map((media) => (
                <ShowcaseItem key={media.title} media={media} onExpand={setExpandedMedia} />
              ))}
            </div>
          ))}
        </div>
      </Container>

      <Lightbox media={expandedMedia} onClose={() => setExpandedMedia(null)} />
    </section>
  )
}
