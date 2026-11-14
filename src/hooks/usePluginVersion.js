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
    return true
  } catch {
    return false
  }
}

async function fetchPluginVersion() {
  const response = await fetch(PLUGIN_DETAILS_URL)
  if (!response.ok) return null
  const { data } = await response.json()
  return data?.[0]?.asset?.description?.match(VERSION_PATTERN)?.[1] ?? null
}

let pendingFetch = null
const fetchSharedVersion = () => {
  pendingFetch ??= fetchPluginVersion().finally(() => {
    pendingFetch = null
  })
  return pendingFetch
}

export function usePluginVersion() {
  const [version, setVersion] = useState(() => readCachedVersion() ?? LATEST_VERSION)

  useEffect(() => {
    let mounted = true
    const refresh = () => {
      if (document.hidden) return
      fetchSharedVersion().then((latest) => {
        if (!mounted || !latest) return
        setVersion(latest)
        cacheVersion(latest)
      }, ignoreFetchFailure)
    }

    refresh()
    const timer = setInterval(refresh, REFRESH_MS)
    return () => {
      mounted = false
      clearInterval(timer)
    }
  }, [])

  return version
}
