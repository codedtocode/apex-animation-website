import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// A reload restores the old scroll position even when the URL names a section, racing App's scroll to the #hash.
// Skip that restore so the hash wins, then turn it back on so Back/Forward still return to where you were.
if (window.location.hash && performance.getEntriesByType('navigation')[0]?.type === 'reload') {
  window.history.scrollRestoration = 'manual'
  window.addEventListener('load', () => setTimeout(() => (window.history.scrollRestoration = 'auto')), { once: true })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
