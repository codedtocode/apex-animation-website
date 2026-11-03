import { useEffect, useState } from 'react'
import { LATEST_VERSION, PLUGIN_DETAILS_URL } from '@/data/site'

const STORAGE_KEY = 'apex-plugin-version'
const REFRESH_MS = 10 * 60 * 1000
const VERSION_PATTERN = /version:?\s*v?(\d+(?:\.\d+)*)/i

const ignoreFetchFailure = () => {}

const readCachedVersion = () => {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

const cacheVersion = (version) => {
  try {
    localStorage.setItem(STORAGE_KEY, version)
  } catch {
    // Storage can be blocked; the fetched version still shows for this visit.
  }
}

async function fetchPluginVersion(signal) {
  const response = await fetch(PLUGIN_DETAILS_URL, { signal })
  if (!response.ok) return null
  const { data } = await response.json()
  return data?.[0]?.asset?.description?.match(VERSION_PATTERN)?.[1] ?? null
}

export function usePluginVersion() {
  const [version, setVersion] = useState(() => readCachedVersion() ?? LATEST_VERSION)

  useEffect(() => {
    const controller = new AbortController()
    const refresh = () => {
      if (document.hidden) return
      fetchPluginVersion(controller.signal).then((latest) => {
        if (!latest) return
        setVersion(latest)
        cacheVersion(latest)
      }, ignoreFetchFailure)
    }

    refresh()
    const timer = setInterval(refresh, REFRESH_MS)
    return () => {
      clearInterval(timer)
      controller.abort()
    }
  }, [])

  return version
}
