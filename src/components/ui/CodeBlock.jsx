import { useEffect, useState } from 'react'
import { Check, Copy, FileCode } from 'lucide-react'
import { highlightLua } from '@/lib/highlightLua'

const COPIED_RESET_MS = 1600

const TOKEN_STYLES = {
  keyword: 'text-[#f86d7c]',
  string: 'text-[#adf195]',
  comment: 'text-[#7c7f88] italic',
  builtin: 'text-[#84d6f7]',
  type: 'text-[#4ec9b0]',
  number: 'text-[#ffc600]',
  method: 'text-[#fdfbac]',
}

export function LuaLine({ line }) {
  return highlightLua(line).map(({ text, type }, index) =>
    type ? (
      <span key={index} className={TOKEN_STYLES[type]}>
        {text}
      </span>
    ) : (
      text
    ),
  )
}

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), COPIED_RESET_MS)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = () => {
    navigator.clipboard?.writeText(code).then(
      () => setCopied(true),
      () => {},
    )
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="flex items-center gap-1.5 rounded-md px-2 py-0.5 transition hover:bg-surface-raised hover:text-fg focus-visible:outline-2 focus-visible:outline-fg"
    >
      {copied ? <Check className="size-4 text-[#adf195]" /> : <Copy className="size-4" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export function CodeBlock({ code, script = 'Script', className = '' }) {
  const lines = code.split('\n')

  return (
    <figure className={`overflow-hidden rounded-xl border border-line bg-[#15181e] ${className}`}>
      <figcaption className="flex items-center justify-between gap-4 border-b border-line bg-panel-bar px-3 py-1.5 text-sm text-fg-faint">
        <span className="flex items-center gap-1.5">
          <FileCode className="size-4" />
          {script}
        </span>
        <CopyButton code={code} />
      </figcaption>
      <pre className="overflow-x-auto py-3 font-mono text-[15px] leading-7 [tab-size:4] text-[#cccccc]">
        <code className="block w-max min-w-full">
          {lines.map((line, index) => (
            <span key={index} className="flex">
              <span aria-hidden="true" className="w-11 shrink-0 pr-4 text-right text-fg-faint/70 select-none">
                {index + 1}
              </span>
              <span className="pr-6 whitespace-pre">
                <LuaLine line={line} />
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}
