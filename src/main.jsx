import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import DataContext from './context/DataContext.jsx'
import DataContextProvider from './context/AllDataContext.jsx'
import BasketContext from './context/BasketContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DataContextProvider>
      <DataContext>
        <BasketContext>
          <App />
        </BasketContext>
      </DataContext>
    </DataContextProvider>
  </BrowserRouter>
);

