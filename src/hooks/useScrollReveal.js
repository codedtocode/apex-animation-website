import { useEffect } from 'react'

const REVEAL_SELECTOR = '.reveal'
const VISIBLE_CLASS = 'is-visible'
const OBSERVER_OPTIONS = { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }

const isAboveViewport = (entry) => entry.boundingClientRect.top < 0

const updateReveal = (entry) => {
  const { target } = entry

  if (entry.isIntersecting) {
    target.classList.add(VISIBLE_CLASS)
    return
  }

  target.classList.remove(VISIBLE_CLASS)
  target.dataset.revealFrom = isAboveViewport(entry) ? 'above' : 'below'
}

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach(updateReveal), OBSERVER_OPTIONS)
    document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}
