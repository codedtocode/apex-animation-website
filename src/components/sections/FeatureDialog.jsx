import { useEffect, useId, useRef, useState } from 'react'
import { Check, Link2, X } from 'lucide-react'
import { AutoVideo } from '@/components/ui/AutoVideo'
import { PagerArrow, PagerDots } from '@/components/ui/Pager'
import mark from '@images/apexanimator-mono-branco-512.png'
import { FeatureTag } from './FeatureTag'

const CLIP_SHIFT_PX = 24
const CLIP_KEYS = { ArrowLeft: -1, ArrowRight: 1 }
const COPIED_MS = 2000

const ignoreClipboardRejection = () => {}

const narrowestRatio = (clips) => Math.min(...clips.map(({ width, height }) => width / height))

const stepClip =
  (delta, count) =>
  ({ index }) => ({ index: (index + delta + count) % count, direction: delta })

function ClipViewer({ clips }) {
  const [{ index, direction }, setView] = useState({ index: 0, direction: 0 })
  const stageId = useId()
  const clip = clips[index]
  const hasMany = clips.length > 1

  const step = (delta) => setView(stepClip(delta, clips.length))
  const showClip = (nextIndex) => setView({ index: nextIndex, direction: Math.sign(nextIndex - index) })

  useEffect(() => {
    if (clips.length < 2) return
    const stepWithArrowKeys = (event) => {
      if (event.target instanceof HTMLInputElement) return
      const delta = CLIP_KEYS[event.key]
      if (delta) setView(stepClip(delta, clips.length))
    }
    window.addEventListener('keydown', stepWithArrowKeys)
    return () => window.removeEventListener('keydown', stepWithArrowKeys)
  }, [clips.length])

  return (
    <div className="border-b border-line">
      <div
        id={stageId}
        className="relative aspect-[max(var(--clip-ratio),1)] max-h-[58vh] w-full overflow-hidden bg-canvas bg-grid text-fg sm:aspect-[max(var(--clip-ratio),16/9)]"
        style={{ '--clip-ratio': narrowestRatio(clips) }}
      >
        <div
          key={clip.src}
          className="absolute inset-0 animate-page-in motion-reduce:animate-none"
          style={{ '--page-shift': `${direction * CLIP_SHIFT_PX}px` }}
        >
          <AutoVideo media={clip} fill seekable />
        </div>
        {hasMany && (
          <>
            <PagerArrow
              direction={-1}
              label="Previous clip"
              controls={stageId}
              onStep={step}
              className="absolute top-1/2 left-3 -translate-y-1/2 sm:left-4"
            />
            <PagerArrow
              direction={1}
              label="Next clip"
              controls={stageId}
              onStep={step}
              className="absolute top-1/2 right-3 -translate-y-1/2 sm:right-4"
            />
          </>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line bg-panel-bar px-5 py-3">
        <p aria-live="polite" className="min-w-0 text-[15px] leading-relaxed">
          <span className="mr-2 font-mono text-xs font-bold tracking-wider text-apex-400 uppercase">
            {hasMany ? `Clip ${index + 1}/${clips.length}` : 'Demo'}
          </span>
          <span className="font-semibold text-fg">{clip.title}.</span>{' '}
          <span className="text-fg-muted">{clip.description}</span>
        </p>
        {hasMany && (
          <PagerDots
            count={clips.length}
            current={index}
            label={(dot) => `Clip ${dot + 1} of ${clips.length}`}
            controls={stageId}
            onSelect={showClip}
          />
        )}
      </div>
    </div>
  )
}

function FeatureDetails({ feature: { title, description, tag, icon: Icon, details, clips }, titleId }) {
  return (
    <div
      className={`grid gap-8 p-6 sm:p-8 ${clips && details.length ? 'lg:grid-cols-[2fr_3fr] lg:gap-14 lg:p-10' : ''}`}
    >
      <div>
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-xl border border-line bg-apex-500 text-white">
            <Icon className="size-5.5" strokeWidth={2} />
          </span>
          <FeatureTag tag={tag} />
        </div>
        <h2
          id={titleId}
          className="mt-5 font-display text-3xl leading-tight font-black font-stretch-semi-expanded sm:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-3 leading-relaxed text-fg-muted">{description}</p>
      </div>
      {details.length > 0 && (
        <div>
          <h3 className="font-mono text-xs font-bold tracking-wider text-fg-faint uppercase">What&rsquo;s inside</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {details.map((detail) => (
              <li key={detail} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted sm:text-base">
                <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rotate-45 bg-apex-500" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), COPIED_MS)
    return () => clearTimeout(timer)
  }, [copied])

  const copyLink = () =>
    navigator.clipboard.writeText(window.location.href).then(() => setCopied(true), ignoreClipboardRejection)

  return (
    <button
      type="button"
      onClick={copyLink}
      className="flex h-8 items-center gap-1.5 rounded-lg px-2.5 font-semibold text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg focus-visible:outline-2 focus-visible:outline-fg"
    >
      {copied ? (
        <Check className="size-3.5 text-apex-400" strokeWidth={3} />
      ) : (
        <Link2 className="size-3.5" strokeWidth={2.5} />
      )}
      <span aria-live="polite">{copied ? 'Link copied' : 'Copy link'}</span>
    </button>
  )
}

export function FeatureDialog({ feature, onClose }) {
  const dialogRef = useRef(null)
  const panelRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (feature && !dialog.open) dialog.showModal()
    else if (!feature && dialog.open) dialog.close()
  }, [feature])

  const close = () => dialogRef.current.close()
  const closeOnOutsideClick = (event) => {
    if (!panelRef.current?.contains(event.target)) close()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={closeOnOutsideClick}
      aria-labelledby={titleId}
      className="m-0 size-full max-h-none max-w-none overflow-y-auto overscroll-contain bg-transparent p-4 text-fg backdrop:animate-fade-in backdrop:bg-black/80 motion-reduce:backdrop:animate-none sm:p-8"
    >
      {feature && (
        <div className="flex min-h-full items-center justify-center">
          <article
            ref={panelRef}
            className={`w-full animate-dialog-in overflow-hidden rounded-2xl border border-line bg-panel motion-reduce:animate-none ${
              feature.clips ? 'max-w-6xl' : 'max-w-2xl'
            }`}
          >
            <div className="flex items-center justify-between gap-4 border-b border-line bg-panel-bar py-1.5 pr-1.5 pl-4 text-sm">
              <span className="flex min-w-0 items-center gap-2 truncate text-fg-faint">
                <img src={mark} alt="" width="16" height="16" className="size-4 opacity-80" />
                Apex Animator
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-fg">{feature.title}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1">
                <CopyLinkButton />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  autoFocus
                  className="grid size-8 place-items-center rounded-lg text-fg-muted transition-colors hover:bg-apex-500 hover:text-white focus-visible:outline-2 focus-visible:outline-fg"
                >
                  <X className="size-4" strokeWidth={2.5} />
                </button>
              </span>
            </div>
            {feature.clips && <ClipViewer key={feature.title} clips={feature.clips} />}
            <FeatureDetails feature={feature} titleId={titleId} />
          </article>
        </div>
      )}
    </dialog>
  )
}
