import { useEffect, useState } from 'react'
import { API_HASH } from '@/data/site'

const viewFromHash = () => (window.location.hash === API_HASH ? 'api' : 'home')

export function useHashView() {
  const [view, setView] = useState(viewFromHash)

  useEffect(() => {
    const updateView = () => setView(viewFromHash())
    window.addEventListener('hashchange', updateView)
    return () => window.removeEventListener('hashchange', updateView)
  }, [])

  return view
}
