import { ArrowUpRight, Download } from 'lucide-react'
import wavingStill from '@/assets/codedtocode-waving-still.png'
import waving from '@/assets/codedtocode-waving.webp'
import { AutoVideo } from '@/components/ui/AutoVideo'
import { RobloxStudioIcon } from '@/components/ui/BrandIcons'
import { Container } from '@/components/ui/Container'
import { DownloadButton } from '@/components/ui/DownloadButton'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { HandNote, SketchArrow, SketchCheck, Tape } from '@/components/ui/Sketch'
import { StarRating } from '@/components/ui/StarRating'
import { HERO_MEDIA } from '@/data/media'
import { HERO_HIGHLIGHTS, LATEST_VERSION, LINKS, STATS } from '@/data/site'
import mark from '@images/apexanimator-mono-512.png'
import apexTile from '@images/apexanimator-tile-1024.png'

const HEADLINE_ICON_STYLE = 'mr-[0.18em] inline-block size-[0.84em] align-[-0.1em]'

function FreeSticker() {
  return (
    <span className="relative inline-block shrink-0 -rotate-2 border-[0.06em] border-ink bg-apex-500 px-[0.2em] pt-[0.04em] pb-[0.02em] text-white shadow-[0.09em_0.09em_0_var(--color-ink)]">
      for free
    </span>
  )
}

function FreeNote() {
  return (
    <span aria-hidden="true" className="reveal hidden items-center gap-2 tracking-normal normal-case sm:inline-flex">
      <SketchArrow shape="straight" className="h-8 w-14 -scale-x-100 text-apex-500 lg:h-11 lg:w-18" />
      <HandNote className="-rotate-3 text-[clamp(1.5rem,2.6vw,2.5rem)]">no catch. free forever!</HandNote>
    </span>
  )
}

function Headline() {
  return (
    <h1 className="font-display text-[clamp(2.1rem,10.4vw,3.6rem)] leading-[1.02] font-black tracking-tight uppercase font-stretch-semi-expanded sm:text-[min(calc((100vw-4rem)/12.4),6.1rem)]">
      <span className="block">Animate anything</span>{' '}
      <span className="block">
        in{' '}
        <span className="whitespace-nowrap">
          <RobloxStudioIcon className={`${HEADLINE_ICON_STYLE} text-ink`} />
          Roblox
        </span>{' '}
        Studio
      </span>{' '}
      <span className="mt-[0.14em] flex items-center gap-[0.3em]">
        <FreeSticker />
        <FreeNote />
      </span>{' '}
      <span className="mt-[0.08em] block">
        with{' '}
        <span className="whitespace-nowrap">
          <img
            src={apexTile}
            alt=""
            width="1024"
            height="1024"
            className={`${HEADLINE_ICON_STYLE} rounded-[22%] border-[0.05em] border-ink`}
          />
          Apex
        </span>
      </span>
    </h1>
  )
}

function LatestReleaseLink() {
  return (
    <ExternalLink
      href={LINKS.devforum}
      className="group inline-flex items-center gap-2.5 self-start border-2 border-ink bg-paper-light py-1.5 pr-3 pl-1.5 text-sm font-semibold shadow-hard-sm transition hover:-translate-0.5 hover:shadow-[5px_5px_0_var(--color-apex-500)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <span className="bg-apex-500 px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-white uppercase">
        Free
      </span>
      Version {LATEST_VERSION} is out. See what&rsquo;s new
      <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-apex-500" />
    </ExternalLink>
  )
}

function Stats() {
  return (
    <dl className="grid grid-cols-2 border-2 border-ink bg-paper-light shadow-hard lg:w-md">
      <div className="flex flex-col gap-1 p-4 sm:p-5">
        <dt className="order-last flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider text-ink-muted uppercase">
          <Download className="size-3.5" strokeWidth={2.5} />
          Downloads
        </dt>
        <dd className="font-display text-4xl leading-none font-black font-stretch-semi-expanded sm:text-5xl">
          {STATS.downloads}
        </dd>
      </div>
      <div className="flex flex-col gap-1 border-l-2 border-ink p-4 sm:p-5">
        <dt className="order-last flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] font-bold tracking-wider text-ink-muted uppercase">
          <StarRating percent={STATS.ratingPercent} />
          Rating
        </dt>
        <dd className="font-display text-4xl leading-none font-black font-stretch-semi-expanded sm:text-5xl">
          {STATS.ratingPercent}%
        </dd>
      </div>
    </dl>
  )
}

function WavingDeveloper() {
  return (
    <picture className="pointer-events-none absolute right-[8%] bottom-[calc(100%+1px)] w-16 sm:w-24 lg:w-30">
      <source srcSet={wavingStill} media="(prefers-reduced-motion: reduce)" />
      <img src={waving} alt="" width="169" height="212" className="block h-auto w-full" />
    </picture>
  )
}

function WindowBar({ tone, children }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 border-b-[3px] border-ink px-3 py-2 font-mono text-[11px] font-bold tracking-wider uppercase ${tone}`}
    >
      {children}
      <span aria-hidden="true" className="flex shrink-0 gap-1.5">
        <span className="size-2.5 border-2 border-current" />
        <span className="size-2.5 border-2 border-current" />
        <span className="size-2.5 bg-current" />
      </span>
    </div>
  )
}

function EditorWindow({ media }) {
  return (
    <div className="relative border-[3px] border-ink bg-ink shadow-hard-lg">
      <Tape className="-top-4 -left-3 -rotate-12 sm:-left-6" />
      <Tape className="-top-3 -right-3 rotate-6 sm:-right-5" />
      <WindowBar tone="bg-paper-light text-ink">
        <span className="flex min-w-0 items-center gap-2">
          <img src={mark} alt="" width="14" height="14" className="size-3.5" />
          <span className="truncate">Apex Animator · Editor</span>
        </span>
      </WindowBar>
      <img
        src={media.src}
        alt="The Apex Animator editor with takes, camera, screen, markers, sounds and joints on one timeline"
        width={media.width}
        height={media.height}
        fetchPriority="high"
        className="block h-auto w-full"
      />
    </div>
  )
}

function LiveCaptureWindow({ media }) {
  return (
    <div className="border-[3px] border-ink bg-ink shadow-hard-red">
      <WindowBar tone="bg-ink text-paper">
        <span className="flex min-w-0 items-center gap-2">
          <span className="size-2.5 shrink-0 animate-pulse rounded-full bg-apex-500 motion-reduce:animate-none" />
          <span className="truncate">
            Rec · Live capture <span className="text-paper/60">/ {media.title}</span>
          </span>
        </span>
      </WindowBar>
      <AutoVideo media={media} />
    </div>
  )
}

function PreviewNotes() {
  return (
    <div aria-hidden="true" className="reveal pointer-events-none absolute inset-0 hidden lg:block">
      <div className="absolute bottom-full left-[38%] flex items-end gap-1">
        <HandNote className="mb-3 -rotate-2">the real editor, no mockups</HandNote>
        <SketchArrow className="h-12 w-16 rotate-[70deg] text-apex-500" />
      </div>
      <div className="absolute bottom-[-23%] left-[6%] flex items-end gap-2">
        <HandNote className="mb-3 -rotate-2">every clip is captured live</HandNote>
        <SketchArrow shape="straight" className="h-10 w-16 -rotate-12 text-apex-500" />
      </div>
    </div>
  )
}

function EditorPreview() {
  const { editor, demo } = HERO_MEDIA

  return (
    <div className="relative mt-16 sm:mt-20 lg:mb-40">
      <figure className="relative lg:w-[80%]">
        <EditorWindow media={editor} />
      </figure>
      <figure className="relative z-10 -mt-8 ml-auto w-[92%] sm:-mt-16 sm:w-[72%] lg:absolute lg:right-0 lg:-bottom-24 lg:mt-0 lg:w-[56%]">
        <WavingDeveloper />
        <LiveCaptureWindow media={demo} />
      </figure>
      <PreviewNotes />
    </div>
  )
}

function Highlights() {
  return (
    <ul className="mt-14 grid border-2 border-ink bg-paper-light font-mono text-xs font-bold tracking-wider uppercase sm:grid-cols-3 lg:mt-4">
      {HERO_HIGHLIGHTS.map((highlight) => (
        <li
          key={highlight}
          className="flex items-center gap-3 border-ink px-4 py-3.5 not-last:border-b-2 sm:not-last:border-r-2 sm:not-last:border-b-0"
        >
          <span className="grid size-6 shrink-0 place-items-center border-2 border-ink bg-paper">
            <SketchCheck className="size-5 text-apex-500" />
          </span>
          {highlight}
        </li>
      ))}
    </ul>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid mask-[linear-gradient(to_bottom,black_40%,transparent)]"
      />

      <Container className="relative">
        <Headline />

        <div className="mt-8 flex flex-col gap-8 sm:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex max-w-xl flex-col gap-6">
            <p className="text-lg leading-relaxed text-ink-muted sm:text-xl">
              Apex Animator is a free animation plugin with physics, live recording, dynamic rig parenting, face
              animation, IK/FK and much more. Free forever.
            </p>
            <LatestReleaseLink />
          </div>
          <Stats />
        </div>
        <DownloadButton className="mt-8 w-full sm:w-auto lg:hidden" />

        <EditorPreview />
        <Highlights />
      </Container>
    </section>
  )
}
