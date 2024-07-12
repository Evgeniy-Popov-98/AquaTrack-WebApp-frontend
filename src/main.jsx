// import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ReactDOM from 'react-dom/client';

import 'modern-normalize';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>

  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>
);
