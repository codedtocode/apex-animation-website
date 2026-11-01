import { Bug, MessageSquarePlus, Rocket, ScrollText, Sparkles, WandSparkles } from 'lucide-react'
import { LINKS } from './site'

export const UPDATE_TRACK_KEYS = [
  { id: 'request-1', position: 0.07, label: 'Feature request', icon: MessageSquarePlus },
  { id: 'fix-1', position: 0.21, label: 'Bug fix', icon: Bug },
  { id: 'tool', position: 0.35, label: 'New tool', icon: Sparkles },
  { id: 'polish', position: 0.5, label: 'Polish', icon: WandSparkles },
  { id: 'fix-2', position: 0.64, label: 'Bug fix', icon: Bug },
  { id: 'request-2', position: 0.78, label: 'Feature request', icon: MessageSquarePlus },
  { id: 'improvement', position: 0.92, label: 'Improvement', icon: Rocket },
]

export const UPDATE_PILLARS = [
  {
    icon: MessageSquarePlus,
    title: 'Built with the community',
    text: 'Feature requests from the Discord and the DevForum shape what comes next.',
  },
  {
    icon: Bug,
    title: 'Bugs fixed fast',
    text: 'Reported issues get tracked down and fixed quickly, often in the very next update.',
  },
  {
    icon: ScrollText,
    title: 'Read the changelog on DevForum',
    text: 'Every update is documented in detail on the official DevForum thread.',
    href: LINKS.devforum,
  },
]
