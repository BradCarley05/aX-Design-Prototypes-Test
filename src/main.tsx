import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PrototypesApp from './PrototypesApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrototypesApp />
  </StrictMode>,
)
