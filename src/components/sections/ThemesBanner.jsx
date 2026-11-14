import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PagerDots } from '@/components/ui/Pager'
import { useInViewport } from '@/hooks/useInViewport'
import { prefersReducedMotion } from '@/lib/motion'
import themeEditor from '@/assets/themes/theme-editor.webp'
import halloweenTheme from '@/assets/themes/theme-halloween.webp'
import orangeTheme from '@/assets/themes/theme-orange.webp'
import themePicker from '@/assets/themes/theme-picker.webp'
import themesBanner from '@images/apex-animator-themes-header.png'

const SLIDES = [
  {
    src: themesBanner,
    width: 1500,
    height: 500,
    label: 'Apex Themes banner',
    alt: 'Apex Themes: the editor shown with different color themes',
  },
  {
    src: halloweenTheme,
    width: 1500,
    height: 500,
    label: 'Custom background',
    alt: 'The editor with a custom Halloween background image, open over the Studio baseplate',
  },
  {
    src: orangeTheme,
    width: 1500,
    height: 500,
    label: 'Orange theme',
    alt: 'The editor in an orange theme, open over the Studio baseplate',
  },
  {
    src: themeEditor,
    width: 1500,
    height: 500,
    label: 'Theme editor',
    alt: 'The theme editor picking a custom panel color next to the editor, over the Studio baseplate',
  },
  {
    src: themePicker,
    width: 534,
    height: 410,
    label: 'Theme picker',
    alt: 'The theme picker listing the built-in themes: Studio, Charcoal, Graphite, Daylight, Midnight and more',
    pan: true,
    holdMs: 3200,
  },
]
const SLIDES_ID = 'themes-slides'
const SLIDE_MS = 2000
const SLIDE_ANIMATION_MS = 700
const SLIDE_EASING = 'cubic-bezier(0.65, 0, 0.35, 1)'
const PAN_KEYFRAMES = { objectPosition: ['50% 0%', '50% 100%'] }
const PAN_TIMING = { duration: 2000, delay: 700, easing: 'ease-in-out', fill: 'both' }
const FIRST_SLIDE = { current: 0, previous: null, direction: 1 }

export function ThemesBanner() {
  const rootRef = useRef(null)
  const slidesRef = useRef(null)
  const slideAnimationsRef = useRef([])
  const panRef = useRef(null)
  const inViewport = useInViewport(rootRef)
  const [{ current, previous, direction }, setSlides] = useState(FIRST_SLIDE)
  const [wasInViewport, setWasInViewport] = useState(inViewport)
  const playing = inViewport && !prefersReducedMotion()

  if (inViewport !== wasInViewport) {
    setWasInViewport(inViewport)
    if (!inViewport) setSlides(FIRST_SLIDE)
  }

  const showSlide = (index, nextDirection) =>
    setSlides((slides) =>
      index === slides.current ? slides : { current: index, previous: slides.current, direction: nextDirection },
    )

  useEffect(() => {
    if (!playing) return
    const timer = setTimeout(
      () => setSlides({ current: (current + 1) % SLIDES.length, previous: current, direction: 1 }),
      SLIDES[current].holdMs ?? SLIDE_MS,
    )
    return () => clearTimeout(timer)
  }, [current, playing])

  useLayoutEffect(() => {
    if (!SLIDES[current].pan && !SLIDES[previous]?.pan) panRef.current?.cancel()
    if (previous === null || prefersReducedMotion()) return

    for (const animation of slideAnimationsRef.current) animation.cancel()
    const slides = slidesRef.current.children
    const options = { duration: SLIDE_ANIMATION_MS, easing: SLIDE_EASING }
    slideAnimationsRef.current = [
      slides[current].animate({ transform: [`translateX(${direction * 100}%)`, 'translateX(0)'] }, options),
      slides[previous].animate(
        { transform: ['translateX(0)', `translateX(${-direction * 100}%)`], visibility: ['visible', 'visible'] },
        options,
      ),
    ]
    if (SLIDES[current].pan) {
      panRef.current?.cancel()
      panRef.current = slides[current].animate(PAN_KEYFRAMES, PAN_TIMING)
    }
  }, [current, previous, direction])

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Apex Themes screenshots"
      className="relative aspect-3/1 overflow-hidden"
    >
      <div ref={slidesRef} id={SLIDES_ID}>
        {SLIDES.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={slide.width}
            height={slide.height}
            loading="lazy"
            className={`absolute inset-0 size-full object-cover ${slide.pan ? 'object-top' : ''} ${
              index === current ? '' : 'invisible'
            }`}
          />
        ))}
      </div>
      <div className="absolute right-2 bottom-2 rounded-full bg-black/55 px-1 backdrop-blur-sm max-sm:hidden">
        <PagerDots
          count={SLIDES.length}
          current={current}
          label={(index) => `Show ${SLIDES[index].label}`}
          controls={SLIDES_ID}
          onSelect={(index) => showSlide(index, index > current ? 1 : -1)}
        />
      </div>
    </div>
  )
}
