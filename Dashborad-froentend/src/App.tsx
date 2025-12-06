// DASHBORAD-FROENTEND/src/App.tsx

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // <-- AGORA IMPORTA A PÁGINA REAL


// Componente Placeholder temporário para o Dashboard
const DashboardPage = () => <div>Dashboard Protegido</div>;


// 2. Componente para Proteger Rotas (Redireciona se não estiver logado)
const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    // Exibe "Carregando" enquanto checa o token no localStorage
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-xl">Carregando...</div>; 
  }

  // Se estiver logado, exibe o elemento; senão, redireciona para /login
  return isLoggedIn ? <>{element}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública: /login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rota Privada: /dashboard */}
        <Route 
          path="/dashboard" 
          element={<PrivateRoute element={<DashboardPage />} />} 
        />
        
        {/* Redirecionamento: Qualquer outra rota vai para /dashboard (se logado) ou /login (se deslogado) */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;