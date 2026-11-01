import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

const MAX_WIDTH_PX = 1400
const MAX_HEIGHT_VH = 80

function LightboxMedia({ media }) {
  const className = 'block h-auto w-full rounded-xl border border-white/10'

  if (media.type === 'video') {
    return (
      <video src={media.src} poster={media.poster} autoPlay muted loop playsInline controls className={className} />
    )
  }
  return <img src={media.src} alt={media.description} width={media.width} height={media.height} className={className} />
}

export function Lightbox({ media, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (media && !dialogRef.current.open) dialogRef.current.showModal()
  }, [media])

  const close = () => dialogRef.current.close()
  const closeOnBackdropClick = (event) => {
    if (event.target === event.currentTarget) close()
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={closeOnBackdropClick}
      aria-label={media?.title}
      className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-4 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
    >
      {media && (
        <figure
          className="relative"
          style={{
            width: `min(calc(100vw - 3rem), ${MAX_WIDTH_PX}px, calc(${MAX_HEIGHT_VH}vh * ${media.width / media.height}))`,
          }}
        >
          <LightboxMedia media={media} />
          <figcaption className="mt-3 text-center text-sm text-ink-300">
            <span className="font-semibold text-white">{media.title}.</span> {media.description}
          </figcaption>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            autoFocus
            className="absolute -top-3 -right-3 grid size-9 place-items-center rounded-full bg-white text-ink-950 shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="size-4" />
          </button>
        </figure>
      )}
    </dialog>
  )
}
