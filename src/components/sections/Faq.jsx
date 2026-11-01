import { Plus } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FAQS } from '@/data/faq'
import { LINKS } from '@/data/site'

function FaqItem({ faq: { question, answer } }) {
  return (
    <details className="group rounded-2xl border border-line bg-surface transition-shadow open:shadow-hard">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-left font-display font-bold font-stretch-semi-expanded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg sm:text-lg [&::-webkit-details-marker]:hidden">
        {question}
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface-raised transition group-open:rotate-45 group-open:bg-apex-500 group-open:text-white">
          <Plus className="size-4.5" strokeWidth={3} />
        </span>
      </summary>
      <p className="border-t border-dashed border-fg/15 px-5 py-4 leading-relaxed text-fg-muted">{answer}</p>
    </details>
  )
}

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          scene="07"
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
      </Container>
    </section>
  )
}
