import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Auth0Provider
    domain="dev-aixmgq1ovdqj6y8m.us.auth0.com"
    clientId="520OcMTqqhqP8TyQHR4WQOsiG41MY3VD"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
     <App />
  </Auth0Provider>
   
  // </StrictMode>,
)
