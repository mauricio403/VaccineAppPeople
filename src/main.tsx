import React from 'react'
import ReactDOM from 'react-dom/client'
import { VaccineApp } from './VaccineApp'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <VaccineApp />
    </BrowserRouter>
  </Provider>
)
