import { ArrowUpRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { PluginPanel } from '@/components/ui/PluginPanel'
import { ProductCard } from '@/components/ui/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LINKS, THEMES_MINIMUM_PRICE } from '@/data/site'
import { PeekingCharacter } from './PeekingCharacter'
import { ThemesBanner } from './ThemesBanner'

function SupportCheckout() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-6">
      <p className="flex items-baseline gap-2">
        <span className="font-display text-4xl leading-none font-black font-stretch-semi-expanded">
          {THEMES_MINIMUM_PRICE}
        </span>
        <span className="text-sm text-fg-muted">solidarity price</span>
      </p>
      <ButtonLink href={LINKS.themes}>
        Support on itch.io
        <ArrowUpRight className="size-4" strokeWidth={2.5} />
      </ButtonLink>
    </div>
  )
}

export function Support() {
  return (
    <section id="support" className="py-8 sm:py-10">
      <Container>
        <PluginPanel
          title="Support"
          status="Checkout happens on itch.io."
          bodyClassName="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16"
        >
          <SectionHeading
            scene="03"
            eyebrow="Support"
            title="Support Apex Animator"
            description={`Apex Animator is built by a solo developer and will always be free. If you enjoy using it, consider contributing ${THEMES_MINIMUM_PRICE} or more to support its development and unlock Apex Themes as a thank you. Your support helps me improve Apex, build new features, and bring new ideas to life.`}
          />
          <div className="reveal @container relative max-lg:ml-12" style={{ '--stud': '9cqw' }}>
            <PeekingCharacter layer="behind" />
            <ProductCard
              className="relative z-10"
              media={<ThemesBanner />}
              status="Unlocks with support"
              statusTone="green"
              title="Apex Themes"
              description="Restyle the editor with ready-made light and dark themes, or create your own colors and backgrounds and make it truly yours."
            >
              <SupportCheckout />
            </ProductCard>
            <PeekingCharacter layer="front" />
          </div>
        </PluginPanel>
      </Container>
    </section>
  )
}
