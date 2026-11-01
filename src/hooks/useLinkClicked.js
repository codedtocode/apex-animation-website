import { useEffect, useState } from 'react'

export function useLinkClicked(href) {
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (clicked) return

    const linkSelector = `a[href="${href}"]`
    const handleClick = (event) => {
      if (event.target.closest(linkSelector)) setClicked(true)
    }
    document.addEventListener('click', handleClick)
    document.addEventListener('auxclick', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('auxclick', handleClick)
    }
  }, [href, clicked])

  return clicked
}
