import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

if (window.location.hash && performance.getEntriesByType('navigation')[0]?.type === 'reload') {
  window.history.scrollRestoration = 'manual'
  window.addEventListener('load', () => setTimeout(() => (window.history.scrollRestoration = 'auto')), { once: true })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
