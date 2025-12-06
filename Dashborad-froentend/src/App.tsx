import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const DashboardPage = () => <div>Dashboard Protegido</div>;

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
  
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-xl">Carregando...</div>; 
  }

  return isLoggedIn ? <>{element}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route 
          path="/dashboard" 
          element={<PrivateRoute element={<DashboardPage />} />} 
        />
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
