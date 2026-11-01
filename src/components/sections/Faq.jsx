import { Plus } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FAQS } from '@/data/faq'
import { LINKS } from '@/data/site'

function FaqItem({ faq: { question, answer } }) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-medium text-white transition hover:text-ink-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-lg [&::-webkit-details-marker]:hidden">
        {question}
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition group-open:rotate-45 group-open:bg-white group-open:text-ink-950 group-open:ring-white">
          <Plus className="size-4" />
        </span>
      </summary>
      <p className="pr-12 pb-6 leading-relaxed text-ink-300">{answer}</p>
    </details>
  )
}

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered."
          description={
            <>
              Can&rsquo;t find what you&rsquo;re looking for? Ask the community on{' '}
              <ExternalLink
                href={LINKS.discord}
                className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                Discord
              </ExternalLink>
              .
            </>
          }
        />

        <div className="reveal divide-y divide-white/8 border-y border-white/8">
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} faq={faq} />
          ))}
        </div>
      </Container>
    </section>
  )
}
