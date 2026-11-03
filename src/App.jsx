import { useEffect } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { StudioBackdrop } from '@/components/layout/StudioBackdrop'
import { ApiPage } from '@/components/sections/ApiPage'
import { ComingSoon } from '@/components/sections/ComingSoon'
import { Faq } from '@/components/sections/Faq'
import { Features } from '@/components/sections/Features'
import { Hero } from '@/components/sections/Hero'
import { Showcase } from '@/components/sections/Showcase'
import { Support } from '@/components/sections/Support'
import { useHashView } from '@/hooks/useHashView'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-60 rounded-xl border border-line bg-surface px-4 py-2 font-mono font-bold uppercase shadow-hard focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Skip to content
    </a>
  )
}

function HomeSections() {
  return (
    <>
      <Hero />
      <Showcase />
      <Features />
      <Support />
      <ComingSoon />
      <Faq />
    </>
  )
}

const scrollToHashTarget = () => {
  document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
}

export default function App() {
  const view = useHashView()
  useScrollReveal(view)

  useEffect(() => {
    if (view === 'api') window.scrollTo({ top: 0, behavior: 'instant' })
    else scrollToHashTarget()
  }, [view])

  return (
    <div className="overflow-x-clip">
      <StudioBackdrop />
      <SkipLink />
      <div className="mx-auto max-w-stage overflow-clip bg-canvas min-[88rem]:my-4 min-[88rem]:rounded-2xl min-[88rem]:border min-[88rem]:border-line">
        <Navbar />
        <main id="main">{view === 'api' ? <ApiPage /> : <HomeSections />}</main>
        <Footer />
      </div>
    </div>
  )
}
