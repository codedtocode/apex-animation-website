import { StatusBadge } from './StatusBadge'

export function ProductCard({ media, status, statusTone, title, description, className = '', children }) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-hard ${className}`}
    >
      <div className="border-b border-line">{media}</div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <StatusBadge tone={statusTone}>{status}</StatusBadge>
        <h3 className="mt-5 font-display text-2xl font-black uppercase font-stretch-semi-expanded">{title}</h3>
        {description && <p className="mt-2 max-w-lg leading-relaxed text-fg-muted">{description}</p>}
        {children}
      </div>
    </article>
  )
}
