import { Container } from '@/components/ui/Container'
import { PluginPanel } from '@/components/ui/PluginPanel'
import { ProductCard } from '@/components/ui/ProductCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import vfxIcon from '@images/apexemitteranimator-tile-1024.png'

function VfxIconStrip() {
  return (
    <div className="relative aspect-3/1 bg-surface-raised bg-grid">
      <img
        src={vfxIcon}
        alt="Apex VFX Animator icon"
        width="1024"
        height="1024"
        loading="lazy"
        className="absolute inset-0 size-full object-contain p-[3%]"
      />
    </div>
  )
}

export function ComingSoon() {
  return (
    <section id="next" className="py-8 sm:py-10">
      <Container>
        <PluginPanel
          title="Apex family"
          status="More tools are on the way."
          bodyClassName="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16"
        >
          <SectionHeading
            scene="04"
            eyebrow="What's next"
            title="The Apex family is growing."
            description="More tools are on the way to make Roblox animation faster, prettier and more fun."
          />
          <ProductCard
            className="reveal"
            media={<VfxIconStrip />}
            status="In development"
            statusTone="blue"
            title="Apex VFX Animator"
            description="A companion VFX plugin for animating particle emitters, designed to work hand in hand with Apex Animator."
          />
        </PluginPanel>
      </Container>
    </section>
  )
}
