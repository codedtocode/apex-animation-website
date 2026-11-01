import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ComingSoon } from '@/components/sections/ComingSoon'
import { Compatibility } from '@/components/sections/Compatibility'
import { EngineComparison } from '@/components/sections/EngineComparison'
import { Faq } from '@/components/sections/Faq'
import { Features } from '@/components/sections/Features'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { Showcase } from '@/components/sections/Showcase'
import { Updates } from '@/components/sections/Updates'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-60 rounded-lg bg-white px-4 py-2 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Skip to content
    </a>
  )
}

export default function App() {
  useScrollReveal()

  return (
    <div className="overflow-x-clip">
      <SkipLink />
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Showcase />
        <Features />
        <EngineComparison />
        <Compatibility />
        <Updates />
        <ComingSoon />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
