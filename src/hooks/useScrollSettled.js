import { useSyncExternalStore } from 'react'

const SETTLE_MS = 200

let settled = true
let timer
const listeners = new Set()

const notify = () => listeners.forEach((listener) => listener())

const settle = () => {
  settled = true
  notify()
}

const onScroll = () => {
  clearTimeout(timer)
  timer = setTimeout(settle, SETTLE_MS)
  if (!settled) return
  settled = false
  notify()
}

const subscribe = (listener) => {
  if (listeners.size === 0) window.addEventListener('scroll', onScroll, { passive: true })
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size > 0) return
    window.removeEventListener('scroll', onScroll)
    clearTimeout(timer)
    settled = true
  }
}

const getSettled = () => settled

// True once the page has gone SETTLE_MS without scrolling. Every caller shares one listener.
export function useScrollSettled() {
  return useSyncExternalStore(subscribe, getSettled, getSettled)
}
