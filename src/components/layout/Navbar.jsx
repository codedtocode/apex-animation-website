import { useCallback, useState } from 'react'
import { Menu, X } from 'lucide-react'
import mark from '@images/apexanimator-mono-branco-512.png'
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
    <a href="#top" className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-white">
      <img src={mark} alt="" width="36" height="36" className="size-9" />
      <span className="font-display text-lg font-bold tracking-tight whitespace-nowrap">Apex Animator</span>
    </a>
  )
}

function DesktopNav() {
  return (
    <nav aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-8 text-sm font-medium text-ink-300">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="transition hover:text-white">
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
      className={`inline-flex h-10 items-center gap-2 rounded-xl bg-white/6 px-3 text-sm font-semibold whitespace-nowrap text-white ring-1 ring-white/10 transition-colors hover:animate-none hover:bg-discord hover:ring-discord focus-visible:animate-none focus-visible:bg-discord focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-4 ${
        discordClicked
          ? ''
          : 'animate-nudge motion-reduce:animate-none motion-reduce:bg-discord motion-reduce:ring-discord'
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
      className="grid size-10 place-items-center rounded-xl text-ink-200 ring-1 ring-white/10 xl:hidden"
    >
      {open ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  )
}

function MobileMenu({ onNavigate }) {
  return (
    <div id={MOBILE_MENU_ID} className="border-t border-white/6 xl:hidden">
      <Container className="py-4">
        <ul className="flex flex-col">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onNavigate}
                className="block rounded-lg px-2 py-3 font-medium text-ink-200 hover:bg-white/4 hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <DownloadButton className="mt-4 mb-2 w-full lg:hidden" />
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solidBackground ? 'border-b border-white/6 bg-ink-950/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-18">
        <BrandLink />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <DiscordNudgeButton />
          <DownloadButton className="py-2.5! text-sm! whitespace-nowrap max-lg:hidden" />
          <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
        </div>
      </Container>

      {menuOpen && <MobileMenu onNavigate={closeMenu} />}
    </header>
  )
}
