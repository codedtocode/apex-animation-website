import { ExternalLink } from './ExternalLink'

const BUTTON_STYLE =
  'inline-flex items-center justify-center gap-2 border-2 border-ink bg-apex-500 px-5 py-3 font-mono text-sm font-bold tracking-wide text-white uppercase shadow-hard transition duration-150 hover:-translate-1 hover:shadow-hard-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink active:translate-0 active:shadow-hard-sm motion-reduce:hover:translate-0'

export function ButtonLink({ href, className = '', children }) {
  return (
    <ExternalLink href={href} className={`${BUTTON_STYLE} ${className}`}>
      {children}
    </ExternalLink>
  )
}
