import { LINKS } from '@/data/site'
import { RobloxIcon } from './BrandIcons'
import { ButtonLink } from './ButtonLink'

export function DownloadButton({ className = '' }) {
  return (
    <ButtonLink href={LINKS.store} className={className}>
      <RobloxIcon className="size-4" />
      Download now
    </ButtonLink>
  )
}
