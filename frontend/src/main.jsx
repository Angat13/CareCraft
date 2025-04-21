import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './Context/StoreContext'
import MedStoreContextProvider from './Context/MedStoreContext.jsx'
import CareStoreContextProvider from './Context/CareStoreContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
    <MedStoreContextProvider>
      <CareStoreContextProvider>
      <App />
      </CareStoreContextProvider>
      </MedStoreContextProvider>
    </StoreContextProvider>   
  </BrowserRouter>
)
