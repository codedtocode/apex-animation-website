import {
  DiscordIcon,
  RobloxIcon,
} from '@/components/ui/BrandIcons'
import { Container } from '@/components/ui/Container'
import { ExternalLink } from '@/components/ui/ExternalLink'
import {
  COMMUNITY_LINKS,
  LINKS,
  NAV_ITEMS,
} from '@/data/site'
import mark from '@images/apexanimator-mono-branco-512.png'

const SOCIAL_BUTTON_STYLE =
  'grid size-11 place-items-center rounded-xl border border-line transition hover:-translate-0.5 hover:bg-apex-500 hover:shadow-hard-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg'
const LIST_TITLE_STYLE = 'font-mono text-xs font-bold tracking-[0.2em] text-apex-400 uppercase'
const LIST_LINK_STYLE =
  'text-fg-muted decoration-apex-500 decoration-2 underline-offset-4 transition hover:text-fg hover:underline'

function FooterBrand() {
  return (
    <div className="max-w-xs">
      <div className="flex items-center gap-2.5">
        <img src={mark} alt="" width="32" height="32" className="size-8" />
        <span className="font-display font-black font-stretch-semi-expanded text-lg uppercase">Apex Animator</span>
      </div>
      <p className="mt-5 text-fg-muted text-sm leading-relaxed">
        The free animation plugin for Roblox Studio. Physics, live recording, face animation, IK/FK and much more.
      </p>
      <div className="flex gap-3 mt-6">
        <ExternalLink href={LINKS.discord} aria-label="Discord" className={SOCIAL_BUTTON_STYLE}>
          <DiscordIcon className="size-5" />
        </ExternalLink>
        <ExternalLink href={LINKS.store} aria-label="Roblox Creator Store" className={SOCIAL_BUTTON_STYLE}>
          <RobloxIcon className="size-4.5" />
        </ExternalLink>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-surface border-line border-t">
      <Container className="pt-16 pb-10">
        <div className="flex md:flex-row flex-col md:justify-between gap-12">
          <FooterBrand />

          <div className="gap-12 sm:gap-20 grid grid-cols-2">
            <nav aria-label="Footer">
              <h2 className={LIST_TITLE_STYLE}>Plugin</h2>
              <ul className="space-y-3 mt-4 text-sm">
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
              <ul className="space-y-3 mt-4 text-sm">
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

        <p className="mt-14 pt-6 border-fg/15 border-t border-dashed font-mono text-[11px] text-fg-faint uppercase tracking-wider">
          &copy; {new Date().getFullYear()} Apex Animator, By Codedtocode
        </p>
      </Container>
    </footer>
  )
}
