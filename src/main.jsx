import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/theme-providers.jsx'
import { InventoryProvider } from './context/inventory-context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<ThemeProvider>
  <InventoryProvider>
      <App />
  </InventoryProvider>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
    
)
