import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api'; 
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  email: string;
  nome?: string;
}

  const DashboardPage: React.FC = () => {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  
  const [data, setData] = useState<User[] | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      if (!token) {

        logout();
        return; 
      }
      
      setLoadingData(true);
      setError(null);
      
      try {

        const response = await api.get('/api/users');
        setData(response.data);
      } catch (err: any) {
        console.error('Erro ao buscar dados protegidos:', err);

        if (err.response && err.response.status === 401) {
            setError('Sessão expirada. Faça login novamente.');
            logout(); 
        } else {
            setError('Falha ao carregar dados do Backend.');
        }
      } finally {
        setLoadingData(false);
      }
    };

    fetchProtectedData();
  }, [token, logout]); 

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <h1 className="text-3xl font-extrabold text-indigo-700">
          Dashboard Principal
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      <main className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Dados da Rota Protegida (/api/users)</h2>
        
        {loadingData && (
            <p className="text-indigo-500">Carregando dados do servidor...</p>
        )}

        {error && (
            <p className="text-red-600">Erro: {error}</p>
        )}

        {data && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium mb-3">Lista de Usuários (Dados Seguros)</h3>
            <ul className="space-y-2">
              {data.map((user) => (
                <li key={user.id} className="border-b pb-2">
                  <span className="font-semibold">{user.nome || 'Nome não fornecido'}</span>: {user.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
