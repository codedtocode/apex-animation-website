import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

const MAX_WIDTH_PX = 1400
const MAX_HEIGHT_VH = 80

function LightboxMedia({ media }) {
  const className = 'block h-auto w-full border-[3px] border-paper bg-ink'

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
      className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-4 text-paper backdrop:bg-ink/90"
    >
      {media && (
        <figure
          className="relative"
          style={{
            width: `min(calc(100vw - 3rem), ${MAX_WIDTH_PX}px, calc(${MAX_HEIGHT_VH}vh * ${media.width / media.height}))`,
          }}
        >
          <LightboxMedia media={media} />
          <figcaption className="mt-4 text-center text-sm text-paper/70">
            <span className="font-mono font-bold text-paper uppercase">{media.title}.</span> {media.description}
          </figcaption>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            autoFocus
            className="absolute -top-4 -right-4 grid size-10 place-items-center border-2 border-ink bg-apex-500 text-white shadow-hard-sm transition hover:-translate-0.5 hover:shadow-hard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            <X className="size-5" strokeWidth={3} />
          </button>
        </figure>
      )}
    </dialog>
  )
}
