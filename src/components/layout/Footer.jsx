import mark from '@images/apexanimator-mono-branco-512.png'
import { DiscordIcon, RobloxIcon } from '@/components/ui/BrandIcons'
import { Container } from '@/components/ui/Container'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { COMMUNITY_LINKS, LINKS, NAV_ITEMS } from '@/data/site'

const SOCIAL_BUTTON_STYLE =
  'grid size-10 place-items-center rounded-xl bg-white/5 text-ink-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white'
const LIST_TITLE_STYLE = 'text-xs font-semibold tracking-[0.2em] text-ink-500 uppercase'
const LIST_LINK_STYLE = 'text-ink-300 transition hover:text-white'

function FooterBrand() {
  return (
    <div className="max-w-xs">
      <div className="flex items-center gap-2.5">
        <img src={mark} alt="" width="32" height="32" className="size-8" />
        <span className="font-display text-lg font-bold tracking-tight">Apex Animator</span>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-ink-400">
        The free animation plugin for Roblox Studio. Physics, live recording, face animation, IK/FK and much more.
      </p>
      <div className="mt-6 flex gap-2">
        <ExternalLink href={LINKS.discord} aria-label="Discord" className={SOCIAL_BUTTON_STYLE}>
          <DiscordIcon className="size-4.5" />
        </ExternalLink>
        <ExternalLink href={LINKS.store} aria-label="Roblox Creator Store" className={SOCIAL_BUTTON_STYLE}>
          <RobloxIcon className="size-4" />
        </ExternalLink>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/6 bg-ink-950">
      <Container className="py-14">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <FooterBrand />

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <nav aria-label="Footer">
              <h2 className={LIST_TITLE_STYLE}>Plugin</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={LIST_LINK_STYLE}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className={LIST_TITLE_STYLE}>Community</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {COMMUNITY_LINKS.map((item) => (
                  <li key={item.label}>
                    <ExternalLink href={item.href} className={LIST_LINK_STYLE}>
                      {item.label}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/6 pt-8 text-xs text-ink-500 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Apex Animator. Free forever.</p>
          <p>Not affiliated with or endorsed by Roblox Corporation.</p>
        </div>
      </Container>
    </footer>
  )
}
