import { CarouselArrow } from '@/components/ui/CarouselArrow'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { useCarousel } from '@/hooks/useCarousel'
import themesBanner from '@images/apex-animator-themes-header.png'
import emitterIcon from '@images/apexemitteranimator-tile-1024.png'
import { MysteryStrip, RedactedLines } from './MysteryStrip'

const TRACK_ID = 'upcoming-tools'

const EDGE_FADES = {
  both: 'mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
  start: 'mask-[linear-gradient(to_right,transparent,black_10%)]',
  end: 'mask-[linear-gradient(to_right,black_90%,transparent)]',
}

function edgeFadeFor(canScrollPrev, canScrollNext) {
  if (canScrollPrev && canScrollNext) return EDGE_FADES.both
  if (canScrollPrev) return EDGE_FADES.start
  if (canScrollNext) return EDGE_FADES.end
  return ''
}

function ThemesBanner() {
  return (
    <div className="relative aspect-3/1 overflow-hidden">
      <img
        src={themesBanner}
        alt="Apex Themes: the editor shown with different color themes"
        width="1500"
        height="500"
        loading="lazy"
        className="size-full object-cover"
      />
    </div>
  )
}

function EmitterIconStrip() {
  return (
    <div className="relative aspect-3/1 bg-ink-850">
      <img
        src={emitterIcon}
        alt="Apex Emitter Animator icon"
        width="1024"
        height="1024"
        loading="lazy"
        className="absolute inset-0 size-full object-contain p-[3%]"
      />
    </div>
  )
}

function ProductCard({ media, status, statusTone, title, description, children }) {
  return (
    <li className="flex shrink-0 basis-[85%] snap-start sm:basis-[60%] lg:basis-[calc((100%-2.5rem)/2.2)]">
      <article className="flex w-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-ink-900">
        {media}
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <StatusBadge tone={statusTone}>{status}</StatusBadge>
          <h3 className="mt-4 font-display text-2xl font-bold">{title}</h3>
          <p className="mt-2 max-w-lg leading-relaxed text-ink-300">{description}</p>
          {children}
        </div>
      </article>
    </li>
  )
}

export function ComingSoon() {
  const { trackRef, canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarousel()

  return (
    <section id="next" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="What's next"
          title="The Apex family is growing."
          description="More tools are on the way to make Roblox animation faster, prettier and more fun."
        />

        <div className="reveal relative mt-14 min-[1440px]:-mx-24 min-[1440px]:px-24 lg:max-[1440px]:px-18">
          <CarouselArrow
            direction="previous"
            hidden={!canScrollPrev}
            onClick={scrollPrev}
            controls={TRACK_ID}
            className="left-0"
          />
          <CarouselArrow
            direction="next"
            hidden={!canScrollNext}
            onClick={scrollNext}
            controls={TRACK_ID}
            className="right-0"
          />
          <ul
            ref={trackRef}
            id={TRACK_ID}
            aria-label="Upcoming tools"
            className={`flex snap-x snap-mandatory scrollbar-none gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden ${edgeFadeFor(canScrollPrev, canScrollNext)}`}
          >
            <ProductCard
              media={<ThemesBanner />}
              status="Coming soon"
              statusTone="yellow"
              title="Apex Themes"
              description="Restyle the editor with ready-made light and dark themes, or create your own colors and backgrounds and make it truly yours."
            />
            <ProductCard
              media={<EmitterIconStrip />}
              status="In development"
              statusTone="blue"
              title="Apex Emitter Animator"
              description="A companion VFX plugin for animating particle emitters, designed to work hand in hand with Apex Animator."
            />
            <ProductCard
              media={<MysteryStrip />}
              status="Under wraps"
              title="Apex VFX"
              description="Something new is taking shape. That’s all we can say for now."
            >
              <RedactedLines />
            </ProductCard>
          </ul>
        </div>
      </Container>
    </section>
  )
}
