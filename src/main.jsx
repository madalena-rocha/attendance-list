import React from 'react';
import ReactDOM from 'react-dom/client';

import { Home } from './pages/Home';

import './styles/global.css';

// renderizando o componente Home e colocando o conteúdo dentro do root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
)