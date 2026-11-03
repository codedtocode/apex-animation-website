import { Braces, CircleHelp, Clapperboard, Palette, Wrench } from 'lucide-react'

const PLUGIN_ASSET_ID = '122196150020773'

export const LINKS = {
  store: `https://create.roblox.com/store/asset/${PLUGIN_ASSET_ID}/Apex-Animator`,
  discord: 'https://discord.gg/GGnC3wUFw8',
  themes: 'https://codedtocode.itch.io/apex-animator-themes',
  devforum:
    'https://devforum.roblox.com/t/plugin-free-apex-animator-physicslive-recording-dynamic-rigparenting-face-animation-ikfk-many-more/4918289',
}

export const LATEST_VERSION = '1.8.11'

// Roblox's own APIs send no CORS headers, so the browser reads the store description through RoProxy's mirror.
export const PLUGIN_DETAILS_URL = `https://apis.roproxy.com/toolbox-service/v1/items/details?assetIds=${PLUGIN_ASSET_ID}`

export const THEMES_MINIMUM_PRICE = '$5'

export const STATS = {
  downloads: '9K+',
  ratingPercent: 98,
}

export const API_HASH = '#api'

export const NAV_ITEMS = [
  { label: 'Showcase', href: '#showcase', icon: Clapperboard },
  { label: 'Features', href: '#features', icon: Wrench },
  { label: 'API', href: API_HASH, icon: Braces },
  { label: 'Themes', href: '#support', icon: Palette },
  { label: 'FAQ', href: '#faq', icon: CircleHelp },
]

export const COMMUNITY_LINKS = [
  { label: 'Creator Store', href: LINKS.store },
  { label: 'Discord', href: LINKS.discord },
  { label: 'DevForum', href: LINKS.devforum },
]
