import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { PluginPanel } from '@/components/ui/PluginPanel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FAQS } from '@/data/faq'
import { LINKS } from '@/data/site'

const EXPAND_EASE = 'ease-[cubic-bezier(0.2,0.8,0.2,1)]'

function FaqItem({ faq: { question, answer } }) {
  const [open, setOpen] = useState(false)
  const answerId = useId()

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={() => setOpen(!open)}
          className={`flex w-full items-center justify-between gap-6 px-5 py-4 text-left font-display font-bold font-stretch-semi-expanded transition-colors duration-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg sm:text-lg ${
            open ? 'bg-surface-raised' : ''
          }`}
        >
          {question}
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-full border border-line transition duration-300 ${EXPAND_EASE} ${
              open ? 'rotate-45 bg-apex-500 text-white' : 'bg-surface-raised'
            }`}
          >
            <Plus className="size-4.5" strokeWidth={3} />
          </span>
        </button>
      </h3>
      <div
        id={answerId}
        inert={!open}
        className={`grid bg-panel transition-[grid-template-rows] duration-400 ${EXPAND_EASE} motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`border-t border-line px-5 py-4 leading-relaxed text-fg-muted transition duration-300 motion-reduce:transition-none ${
              open ? 'translate-y-0 opacity-100 delay-100' : '-translate-y-2 opacity-0'
            }`}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Faq() {
  return (
    <section id="faq" className="py-8 pb-24 sm:py-10 sm:pb-32">
      <Container>
        <PluginPanel
          title="Help!"
          status="Click a question to expand it."
          bodyClassName="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
        >
          <SectionHeading
            scene="05"
            eyebrow="FAQ"
            title="Questions, answered."
            description={
              <>
                Can&rsquo;t find what you&rsquo;re looking for? Ask the community on{' '}
                <ExternalLink
                  href={LINKS.discord}
                  className="font-bold text-fg underline decoration-apex-500 decoration-[3px] underline-offset-4 hover:text-apex-400"
                >
                  Discord
                </ExternalLink>
                .
              </>
            }
          />

          <div className="reveal flex flex-col gap-3">
            {FAQS.map((faq) => (
              <FaqItem key={faq.question} faq={faq} />
            ))}
          </div>
        </PluginPanel>
      </Container>
    </section>
  )
}
