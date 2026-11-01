import { ExternalLink } from './ExternalLink'

const BUTTON_STYLE =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink-950 shadow-[0_10px_30px_-12px_rgba(255,255,255,0.35)] transition duration-200 hover:scale-106 hover:shadow-[0_12px_36px_-10px_rgba(255,255,255,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hover:scale-100 sm:text-base'

export function ButtonLink({ href, className = '', children }) {
  return (
    <ExternalLink href={href} className={`${BUTTON_STYLE} ${className}`}>
      {children}
    </ExternalLink>
  )
}
