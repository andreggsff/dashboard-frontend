// DASHBORAD-FROENTEND/src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx'; // Importa o Provider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 🚨 Envolvemos toda a aplicação com o AuthProvider */}
    <AuthProvider> 
      <App />
    </AuthProvider>
  </React.StrictMode>,
);