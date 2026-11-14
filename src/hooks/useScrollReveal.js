import { useEffect, useLayoutEffect } from 'react'

const REVEAL_SELECTOR = '.reveal'
const VISIBLE_CLASS = 'is-visible'
const OBSERVER_OPTIONS = { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
const ON_SCREEN_SHARE = 0.1
const SCREEN_BOTTOM = 0.92

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

const isOnScreen = (element) => {
  const { top, bottom, height } = element.getBoundingClientRect()
  if (height === 0) return false
  const shown = Math.min(bottom, window.innerHeight * SCREEN_BOTTOM) - Math.max(top, 0)
  return shown / height >= ON_SCREEN_SHARE
}

const showWithoutFade = (element) => {
  element.style.transition = 'none'
  element.classList.add(VISIBLE_CLASS)
  element.getBoundingClientRect()
  element.style.transition = ''
}

export function useScrollReveal(resetKey) {
  useLayoutEffect(() => {
    document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
      if (isOnScreen(element)) showWithoutFade(element)
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach(updateReveal), OBSERVER_OPTIONS)
    document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [resetKey])
}
