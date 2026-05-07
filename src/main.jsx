import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Starfall from './Starfall.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Starfall />
  </StrictMode>,
)
