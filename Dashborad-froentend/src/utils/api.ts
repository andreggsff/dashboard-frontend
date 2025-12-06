// dashboard-frontend/src/utils/api.ts

import axios from 'axios';

// 🚨 IMPORTANTE: Aqui você define a URL base da sua API
// EM PRODUÇÃO, esta URL será a variável de ambiente VITE_API_BASE_URL do Render!
const api = axios.create({
  // Use a URL local por enquanto, depois mude para a URL do Render:
  baseURL: 'http://localhost:3000', // Ou a URL pública do seu Web Service do Render
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Adiciona o Token JWT em TODAS as requisições
api.interceptors.request.use((config) => {
  // Pega o token salvo localmente após o login
  const token = localStorage.getItem('authToken');

  if (token) {
    // Adiciona o token ao cabeçalho de Autorização (Authorization: Bearer TOKEN)
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;