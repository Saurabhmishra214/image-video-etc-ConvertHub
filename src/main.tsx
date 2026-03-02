import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/global.module.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
