import React from 'react'
import ReactDOM from 'react-dom/client'
import { VaccineApp } from './VaccineApp'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <VaccineApp />
  </BrowserRouter>
)
