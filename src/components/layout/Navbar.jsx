import { useCallback, useState } from 'react'
import { Menu, PanelRight, X } from 'lucide-react'
import mark from '@images/apexanimator-mono-branco-512.png'
import { DiscordIcon } from '@/components/ui/BrandIcons'
import { Container } from '@/components/ui/Container'
import { DownloadButton } from '@/components/ui/DownloadButton'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { API_HASH, LINKS, NAV_ITEMS } from '@/data/site'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { useHashView } from '@/hooks/useHashView'
import { useLinkClicked } from '@/hooks/useLinkClicked'

const MOBILE_MENU_ID = 'mobile-menu'

const MENU_ITEM_STYLE =
  'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-fg-muted transition hover:bg-select hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg aria-[current=page]:bg-select aria-[current=page]:text-white'

function TitleBar() {
  return (
    <div className="flex h-10 items-center justify-between gap-4 border-b border-line bg-panel-bar px-4 sm:px-5">
      <a
        href="#top"
        className="flex min-w-0 items-center gap-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
      >
        <img src={mark} alt="" width="16" height="16" className="size-4" />
        <span className="font-semibold whitespace-nowrap">Apex Animator</span>
        <span className="truncate text-fg-faint max-sm:hidden">· Free animation plugin for Roblox Studio</span>
      </a>
      <span aria-hidden="true" className="flex shrink-0 gap-3 text-fg-faint max-sm:hidden">
        <PanelRight className="size-4" />
        <X className="size-4" />
      </span>
    </div>
  )
}

const currentPage = (href, view) => (view === 'api' && href === API_HASH ? 'page' : undefined)

function MenuBar({ view }) {
  return (
    <nav aria-label="Main" className="max-xl:hidden">
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <li key={href}>
            <a href={href} aria-current={currentPage(href, view)} className={MENU_ITEM_STYLE}>
              <Icon className="size-4" strokeWidth={1.75} />
              {label}
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
      className={`group relative isolate inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-surface px-3 font-mono text-sm font-bold tracking-wide whitespace-nowrap uppercase transition-colors hover:animate-none hover:bg-discord hover:text-white focus-visible:animate-none focus-visible:bg-discord focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg sm:px-4 ${
        discordClicked
          ? ''
          : 'animate-nudge motion-reduce:animate-none motion-reduce:bg-discord motion-reduce:text-white'
      }`}
    >
      {!discordClicked && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 animate-nudge-flash rounded-[inherit] bg-discord opacity-0 group-hover:animate-none group-focus-visible:animate-none motion-reduce:animate-none"
        />
      )}
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
      className="grid size-10 place-items-center rounded-lg border border-line bg-surface transition-colors hover:bg-surface-raised xl:hidden"
    >
      {open ? <X className="size-4.5" strokeWidth={2.5} /> : <Menu className="size-4.5" strokeWidth={2.5} />}
    </button>
  )
}

function MobileMenu({ view, onNavigate }) {
  return (
    <div id={MOBILE_MENU_ID} className="border-t border-line xl:hidden">
      <Container className="py-4">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                onClick={onNavigate}
                aria-current={currentPage(href, view)}
                className={`${MENU_ITEM_STYLE} py-3 text-base`}
              >
                <Icon className="size-4.5" strokeWidth={1.75} />
                {label}
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
  const view = useHashView()
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useEscapeKey(closeMenu, menuOpen)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-panel">
      <TitleBar />
      <div className="flex h-14 items-center gap-3 px-3 sm:px-4">
        <MenuBar view={view} />
        <div className="ml-auto flex items-center gap-2">
          <DiscordNudgeButton />
          <DownloadButton className="h-10 py-0! whitespace-nowrap shadow-none! hover:translate-0! hover:bg-apex-400 active:translate-0! max-lg:hidden" />
          <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
        </div>
      </div>

      {menuOpen && <MobileMenu view={view} onNavigate={closeMenu} />}
    </header>
  )
}
