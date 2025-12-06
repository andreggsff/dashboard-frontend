// DASHBORAD-FROENTEND/src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../utils/api'; // O cliente Axios que criamos

// 1. Definição de Tipos
interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// 2. Criação do Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. O Componente Provedor (Provider)
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Estado para armazenar o token e o status de login
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Efeito para checar se já existe um token salvo (para manter a sessão após um refresh)
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false); // O loading termina após checar o localStorage
  }, []);

  // Função de LOGIN (Chama a API do Backend)
  const login = async (email: string, senha: string) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, senha });
      
      const newToken = response.data.token;
      
      // 1. Salva o token no estado local e no localStorage
      setToken(newToken);
      localStorage.setItem('authToken', newToken);
      
      // 2. O interceptor do Axios (utils/api.ts) garantirá que este token seja usado.
    } catch (error) {
      console.error('Erro no login:', error);
      throw new Error('Falha na autenticação. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  // Função de LOGOUT
  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken'); // Remove o token
    // Poderia redirecionar para a página de login aqui
  };

  const contextValue: AuthContextType = {
    isLoggedIn: !!token, // Retorna true se token não for null
    token,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {/* Exibe o componente filho apenas após o loading inicial */}
      {!loading && children} 
    </AuthContext.Provider>
  );
};

// 4. Hook Customizado para usar o Contexto Facilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};