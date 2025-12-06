// DASHBORAD-FROENTEND/src/pages/LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  // 1. Estados para os campos do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. Estado para feedback de erro e carregamento
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3. Hooks para Autenticação e Navegação
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Se o usuário já estiver logado, redireciona imediatamente
  if (isLoggedIn) {
    navigate('/dashboard', { replace: true });
    return null; // Não renderiza nada enquanto redireciona
  }


  // 4. Função de Submissão do Formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o recarregamento da página
    setError(null);
    setIsSubmitting(true);

    try {
      // Chama a função de login do AuthContext
      await login(email, password);
      
      // Se for bem-sucedido, o estado isLoggedIn no AuthContext mudará,
      // e o useEffect no App.tsx irá garantir que o usuário seja redirecionado.
      // Ou, podemos redirecionar explicitamente aqui:
      navigate('/dashboard', { replace: true });

    } catch (err: any) {
      // Exibe a mensagem de erro da API ou a mensagem padrão
      setError(err.message || 'Ocorreu um erro desconhecido durante o login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Faça login na sua conta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Endereço de Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Mensagem de Erro (se houver) */}
            {error && (
              <p className="text-sm font-medium text-red-600 text-center">{error}</p>
            )}

            {/* Botão de Submissão */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting} // Desabilita o botão durante a submissão
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;