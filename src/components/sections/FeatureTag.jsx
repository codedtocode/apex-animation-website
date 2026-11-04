import { FEATURE_TAGS } from '@/data/features'

const TAG_STYLES = {
  native: 'bg-canvas text-fg',
  hybrid: 'bg-surface-raised text-fg',
  engine: 'bg-fg text-canvas',
}

export function FeatureTag({ tag }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-wider uppercase ${TAG_STYLES[tag]}`}
    >
      {FEATURE_TAGS[tag]}
    </span>
  )
}
