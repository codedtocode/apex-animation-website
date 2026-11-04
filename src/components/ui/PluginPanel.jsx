import { PanelRight, X } from 'lucide-react'
import mark from '@images/apexanimator-mono-branco-512.png'

function TitleBar({ title }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line bg-panel-bar px-4 py-2.5 text-sm">
      <span className="flex min-w-0 items-center gap-2 truncate text-fg-faint">
        <img src={mark} alt="" width="16" height="16" className="size-4 opacity-80" />
        Apex Animator
        <span aria-hidden="true">·</span>
        <span className="font-semibold text-fg">{title}</span>
      </span>
      <span aria-hidden="true" className="flex shrink-0 gap-2.5 text-fg-faint">
        <PanelRight className="size-4" />
        <X className="size-4" />
      </span>
    </div>
  )
}

export function PluginPanel({ title, toolbar, status, bodyClassName = '', children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-hard-lg">
      <TitleBar title={title} />
      {toolbar && <div className="border-b border-line bg-panel-bar/60 px-3 py-2">{toolbar}</div>}
      <div className={`p-6 sm:p-10 lg:p-12 ${bodyClassName}`}>{children}</div>
      {status && <p className="border-t border-line px-4 py-2 text-xs text-fg-faint">{status}</p>}
    </div>
  )
}
