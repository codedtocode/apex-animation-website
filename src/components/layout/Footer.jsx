import mark from '@images/apexanimator-mono-branco-512.png'
import { DiscordIcon, RobloxIcon } from '@/components/ui/BrandIcons'
import { Container } from '@/components/ui/Container'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { COMMUNITY_LINKS, LINKS, NAV_ITEMS } from '@/data/site'

const SOCIAL_BUTTON_STYLE =
  'grid size-11 place-items-center border-2 border-paper transition hover:-translate-0.5 hover:bg-apex-500 hover:shadow-[3px_3px_0_var(--color-paper)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper'
const LIST_TITLE_STYLE = 'font-mono text-xs font-bold tracking-[0.2em] text-apex-400 uppercase'
const LIST_LINK_STYLE =
  'text-paper/75 decoration-apex-500 decoration-2 underline-offset-4 transition hover:text-paper hover:underline'

function FooterBrand() {
  return (
    <div className="max-w-xs">
      <div className="flex items-center gap-2.5">
        <img src={mark} alt="" width="32" height="32" className="size-8" />
        <span className="font-display text-lg font-black uppercase font-stretch-semi-expanded">Apex Animator</span>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-paper/70">
        The free animation plugin for Roblox Studio. Physics, live recording, face animation, IK/FK and much more.
      </p>
      <div className="mt-6 flex gap-3">
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
    <footer className="overflow-hidden border-t-[3px] border-ink bg-ink text-paper">
      <Container className="pt-16">
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

        <div className="mt-14 flex flex-col gap-2 border-t-2 border-dashed border-paper/25 pt-6 font-mono text-[11px] tracking-wider text-paper/55 uppercase sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Apex Animator. Free forever.</p>
          <p>Not affiliated with or endorsed by Roblox Corporation.</p>
        </div>

        <p
          aria-hidden="true"
          className="mt-8 mb-[-0.12em] font-display text-[min(calc((100vw-3rem)/10.7),7.1rem)] leading-none font-black tracking-tighter whitespace-nowrap uppercase font-stretch-expanded select-none"
        >
          Apex<span className="text-apex-500">/</span>Animator
        </p>
      </Container>
    </footer>
  )
}
