import { ArrowUpRight, Check, Download } from 'lucide-react'
import wavingStill from '@/assets/codedtocode-waving-still.png'
import waving from '@/assets/codedtocode-waving.webp'
import { AutoVideo } from '@/components/ui/AutoVideo'
import { RobloxStudioIcon } from '@/components/ui/BrandIcons'
import { Container } from '@/components/ui/Container'
import { DownloadButton } from '@/components/ui/DownloadButton'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { StarRating } from '@/components/ui/StarRating'
import { HERO_MEDIA } from '@/data/media'
import { HERO_HIGHLIGHTS, LATEST_VERSION, LINKS, STATS } from '@/data/site'
import mark from '@images/apexanimator-mono-branco-512.png'
import apexTile from '@images/apexanimator-tile-1024.png'

const HEADLINE_ICON_STYLE = 'mr-[0.2em] inline-block size-[0.86em] align-[-0.08em]'

function Headline() {
  return (
    <h1 className="max-w-full font-display text-[clamp(1.75rem,9.4vw,3.4rem)] leading-[1.15] font-bold tracking-tight text-balance sm:text-[3.5rem] lg:text-[3.1rem] xl:text-[4rem]">
      <span className="block">
        Animate anything in{' '}
        <span className="whitespace-nowrap">
          <RobloxStudioIcon className={`${HEADLINE_ICON_STYLE} text-white`} />
          Roblox Studio
        </span>
      </span>{' '}
      <span className="mt-[0.18em] block">
        <span className="inline-block rounded-[0.2em] bg-white px-[0.24em] pb-[0.06em] whitespace-nowrap text-ink-950 shadow-[0_12px_40px_-12px_rgba(255,255,255,0.45)]">
          for free
        </span>{' '}
        with{' '}
        <span className="whitespace-nowrap">
          <img
            src={apexTile}
            alt=""
            width="1024"
            height="1024"
            className={`${HEADLINE_ICON_STYLE} rounded-[22%] shadow-[0_8px_24px_-8px_rgba(225,29,38,0.7)]`}
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
      className="group mt-6 inline-flex items-center gap-2 rounded-full border border-apex-500/35 bg-apex-500/8 py-1.5 pr-3 pl-1.5 text-xs font-medium text-ink-200 shadow-[0_0_24px_-6px_rgba(225,29,38,0.35)] transition hover:border-apex-500/60 hover:shadow-[0_0_28px_-4px_rgba(225,29,38,0.5)] sm:text-sm"
    >
      <span className="rounded-full bg-apex-500 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white uppercase">
        Free
      </span>
      Version {LATEST_VERSION} is out. See what&rsquo;s new
      <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-apex-400" />
    </ExternalLink>
  )
}

function Stats() {
  return (
    <ul className="mt-6 flex items-center divide-x divide-white/15 text-sm whitespace-nowrap text-ink-300 max-[359px]:flex-col max-[359px]:gap-2 max-[359px]:divide-x-0 sm:text-base">
      <li className="flex items-center gap-2 pr-4 max-[359px]:pr-0 sm:pr-5">
        <Download className="size-4 text-white" strokeWidth={2.5} />
        <span>
          <strong className="font-display font-bold text-white">{STATS.downloads}</strong> downloads
        </span>
      </li>
      <li className="flex items-center gap-2 pl-4 max-[359px]:pl-0 sm:pl-5">
        <StarRating percent={STATS.ratingPercent} />
        <span>
          <strong className="font-display font-bold text-white">{STATS.ratingPercent}%</strong> rating
        </span>
      </li>
    </ul>
  )
}

function WavingDeveloper() {
  return (
    <picture className="pointer-events-none absolute right-[8%] bottom-[calc(100%-2px)] w-16 sm:w-24 lg:w-30">
      <source srcSet={wavingStill} media="(prefers-reduced-motion: reduce)" />
      <img
        src={waving}
        alt=""
        width="169"
        height="212"
        className="block h-auto w-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)]"
      />
    </picture>
  )
}

function LiveCaptureWindow({ media }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/15 bg-ink-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.95)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/8 bg-ink-850 px-3 py-2 text-xs">
        <span className="flex min-w-0 items-center gap-2 text-ink-400">
          <img src={mark} alt="" width="14" height="14" className="size-3.5" />
          <span className="truncate">
            Live capture <span className="text-ink-200">· {media.title}</span>
          </span>
        </span>
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </span>
      </div>
      <AutoVideo media={media} />
    </div>
  )
}

function EditorPreview() {
  const { editor, demo } = HERO_MEDIA

  return (
    <div className="relative mt-14 sm:mt-16 lg:mb-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-10 inset-y-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_65%)] blur-2xl"
      />
      <figure className="relative lg:w-[80%]">
        <img
          src={editor.src}
          alt="The Apex Animator editor with takes, camera, screen, markers, sounds and joints on one timeline"
          width={editor.width}
          height={editor.height}
          fetchPriority="high"
          className="block h-auto w-full rounded-xl border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
        />
      </figure>
      <figure className="relative z-10 -mt-10 ml-auto w-[92%] sm:-mt-20 sm:w-[72%] lg:absolute lg:right-0 lg:-bottom-24 lg:mt-0 lg:w-[56%]">
        <WavingDeveloper />
        <LiveCaptureWindow media={demo} />
      </figure>
    </div>
  )
}

function Highlights() {
  return (
    <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-ink-400 lg:mt-0">
      {HERO_HIGHLIGHTS.map((highlight) => (
        <li key={highlight} className="flex items-center gap-2">
          <Check className="size-4 text-white" />
          {highlight}
        </li>
      ))}
    </ul>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid mask-[radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-180 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(255,255,255,0.08),transparent)]"
      />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <Headline />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-300 sm:text-lg">
            Apex Animator is a free animation plugin with physics, live recording, dynamic rig parenting, face
            animation, IK/FK and much more. Free forever.
          </p>
          <LatestReleaseLink />
          <Stats />
          <DownloadButton className="mt-8 w-full sm:w-auto lg:hidden" />
        </div>

        <EditorPreview />
        <Highlights />
      </Container>
    </section>
  )
}
