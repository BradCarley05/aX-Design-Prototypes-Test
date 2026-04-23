import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'ax-arc-prototyping/styles'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
