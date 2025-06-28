import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa o componente App principal
import './styles/globalStyles'; // Importa o arquivo que injeta os estilos globais

// Cria a raiz do React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
