import React from 'react';
import ReactDOM from 'react-dom/client';

// Extensão jsx para criar as interfaces de forma declarativa
// Dentro da estrutura de um arquivo jsx temos uma função cujo retorno é um conteúdo html, que será renderizado na tela para o usuário

import { Home } from './pages/Home';
// por padrão, quando não é informado o nome do arquivo que deseja carregar na pasta, é carregado o index.jsx
// necessário colocar o Home entre chaves porque no index.jsx está exportando Home() sem o default

import './styles/global.css';
// para arquivos css é necessário colocar a extensão, diferente dos arquivos jsx, onde não é necessário colocar a extensão

// DOM é a árvore de elementos que é renderizada no navegador
// renderizando o componente Home e colocando o conteúdo dentro do root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
)