import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../utils/api'; 

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false); 
  }, []);

  const login = async (email: string, senha: string) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, senha });
      
      const newToken = response.data.token;
      
      setToken(newToken);
      localStorage.setItem('authToken', newToken);
      
    } catch (error) {
      console.error('Erro no login:', error);
      throw new Error('Falha na autenticação. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken'); 
  };

  const contextValue: AuthContextType = {
    isLoggedIn: !!token, 
    token,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
