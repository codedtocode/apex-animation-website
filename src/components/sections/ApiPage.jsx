import { useState } from 'react'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { CodeBlock, LuaLine } from '@/components/ui/CodeBlock'
import { Container } from '@/components/ui/Container'
import { PluginPanel } from '@/components/ui/PluginPanel'
import { RichText } from '@/components/ui/RichText'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { API_CALLS, API_QUICKSTART, API_REQUIRE, API_SCENE_NOTE, API_TRACK_NOTE } from '@/data/api'

const SUBHEADING_STYLE = 'font-display text-xl font-extrabold font-stretch-semi-expanded sm:text-2xl'
const NOTE_STYLE = 'max-w-3xl leading-relaxed text-fg-muted'

const exampleId = (index) => `api-example-${index}`

function BackLink() {
  return (
    <a
      href="#top"
      className="inline-flex items-center gap-2 text-base text-fg-muted transition hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
    >
      <ArrowLeft className="size-4" />
      Back to Apex Animator
    </a>
  )
}

function CallRow({ entry: { call, description, example }, index, open, onToggle }) {
  return (
    <>
      <tr
        className={`border-t border-line align-top transition-colors max-sm:flex max-sm:flex-col max-sm:first:border-t-0 ${open ? 'bg-surface' : ''}`}
      >
        <td className="p-0">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={exampleId(index)}
            className="flex w-full items-start gap-2 px-4 py-3 text-left font-mono text-[15px] [overflow-wrap:anywhere] text-[#cccccc] transition hover:bg-surface-raised/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg"
          >
            <ChevronRight
              className={`mt-1 size-4 shrink-0 text-fg-faint transition-transform ${open ? 'rotate-90' : ''}`}
            />
            <span>
              <LuaLine line={call} />
            </span>
          </button>
        </td>
        <td className="px-4 py-3 leading-relaxed text-fg-muted max-sm:pt-0 max-sm:pl-10">
          <RichText text={description} />
        </td>
      </tr>
      {open && (
        <tr id={exampleId(index)} className="bg-surface max-sm:block">
          <td colSpan={2} className="px-4 pb-4 max-sm:block">
            <CodeBlock script="Example" code={example} />
          </td>
        </tr>
      )}
    </>
  )
}

function CallsTable() {
  const [openCalls, setOpenCalls] = useState(() => new Set())

  const toggle = (call) =>
    setOpenCalls((current) => {
      const next = new Set(current)
      if (!next.delete(call)) next.add(call)
      return next
    })

  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <table className="w-full text-left text-base max-sm:block">
        <thead className="bg-panel-bar text-fg max-sm:hidden">
          <tr>
            <th scope="col" className="w-[55%] px-4 py-3 font-semibold">
              Call
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              What it does
            </th>
          </tr>
        </thead>
        <tbody className="max-sm:block">
          {API_CALLS.map((entry, index) => (
            <CallRow
              key={entry.call}
              entry={entry}
              index={index}
              open={openCalls.has(entry.call)}
              onToggle={() => toggle(entry.call)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ApiPage() {
  return (
    <section id="api" className="py-10 sm:py-14">
      <Container>
        <BackLink />
        <div className="mt-6">
          <PluginPanel
            title="API Reference"
            status="Click a call to see an example. Use Copy to paste it into a script."
          >
            <SectionHeading eyebrow="ApexEngine API" title="API REFERENCE" />

            <CodeBlock script="Setup" code={API_REQUIRE} className="mt-10" />

            <h3 className={`mt-14 ${SUBHEADING_STYLE}`}>Calls</h3>
            <p className="mt-2 text-fg-faint">Click a call to see an example.</p>
            <div className="mt-5">
              <CallsTable />
            </div>
            <p className={`mt-6 ${NOTE_STYLE}`}>
              <RichText text={API_TRACK_NOTE} />
            </p>

            <h3 className={`mt-14 ${SUBHEADING_STYLE}`}>{API_QUICKSTART.title}</h3>
            <CodeBlock script={API_QUICKSTART.script} code={API_QUICKSTART.code} className="mt-5" />
            <p className={`mt-6 ${NOTE_STYLE}`}>{API_SCENE_NOTE}</p>
          </PluginPanel>
        </div>
      </Container>
    </section>
  )
}
