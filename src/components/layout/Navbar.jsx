import { useCallback, useState } from 'react'
import { Menu, X } from 'lucide-react'
import mark from '@images/apexanimator-mono-512.png'
import { DiscordIcon } from '@/components/ui/BrandIcons'
import { Container } from '@/components/ui/Container'
import { DownloadButton } from '@/components/ui/DownloadButton'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { LINKS, NAV_ITEMS } from '@/data/site'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { useLinkClicked } from '@/hooks/useLinkClicked'
import { useScrolledPast } from '@/hooks/useScrolledPast'

const SOLID_BACKGROUND_AFTER_PX = 12
const MOBILE_MENU_ID = 'mobile-menu'

function BrandLink() {
  return (
    <a
      href="#top"
      className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <img src={mark} alt="" width="36" height="36" className="size-9" />
      <span className="font-display text-lg font-black tracking-tight whitespace-nowrap uppercase font-stretch-semi-expanded">
        Apex Animator
      </span>
    </a>
  )
}

function DesktopNav() {
  return (
    <nav aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-7 font-mono text-xs font-bold tracking-wider uppercase">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="decoration-apex-500 decoration-[3px] underline-offset-[6px] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function DiscordNudgeButton() {
  const discordClicked = useLinkClicked(LINKS.discord)

  return (
    <ExternalLink
      href={LINKS.discord}
      className={`inline-flex h-11 items-center gap-2 border-2 border-ink bg-paper-light px-3 font-mono text-xs font-bold tracking-wide whitespace-nowrap uppercase shadow-hard-sm transition-[translate,box-shadow,background-color,color] hover:-translate-0.5 hover:animate-none hover:bg-discord hover:text-white hover:shadow-hard focus-visible:animate-none focus-visible:bg-discord focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:px-4 ${
        discordClicked
          ? ''
          : 'animate-nudge motion-reduce:animate-none motion-reduce:bg-discord motion-reduce:text-white'
      }`}
    >
      <DiscordIcon className="size-5" />
      <span className="sr-only sm:not-sr-only">Join the Discord community</span>
    </ExternalLink>
  )
}

function MenuToggle({ open, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={MOBILE_MENU_ID}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="grid size-11 place-items-center border-2 border-ink bg-paper-light shadow-hard-sm xl:hidden"
    >
      {open ? <X className="size-5" strokeWidth={2.5} /> : <Menu className="size-5" strokeWidth={2.5} />}
    </button>
  )
}

function MobileMenu({ onNavigate }) {
  return (
    <div id={MOBILE_MENU_ID} className="border-t-2 border-ink xl:hidden">
      <Container className="py-4">
        <ul className="flex flex-col">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onNavigate}
                className="block border-b-2 border-dashed border-ink/20 px-1 py-3.5 font-mono text-sm font-bold tracking-wider uppercase hover:text-apex-500"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <DownloadButton className="mt-5 mb-3 w-full lg:hidden" />
      </Container>
    </div>
  )
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolledPast(SOLID_BACKGROUND_AFTER_PX)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useEscapeKey(closeMenu, menuOpen)

  const solidBackground = scrolled || menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b-2 transition-colors duration-200 ${
        solidBackground ? 'border-ink bg-paper' : 'border-transparent'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-18">
        <BrandLink />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <DiscordNudgeButton />
          <DownloadButton className="h-11 py-0! text-xs! whitespace-nowrap max-lg:hidden" />
          <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
        </div>
      </Container>

      {menuOpen && <MobileMenu onNavigate={closeMenu} />}
    </header>
  )
}
