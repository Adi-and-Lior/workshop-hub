import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import WorkshopDetailsPage from './pages/WorkshopDetailsPage';
import NotFoundPage from './pages/NotFoundPage'; 
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage';
import Footer from './components/Footer';
import Header from './components/Header'; 
import MyWorkshopsPage from './pages/MyWorkshopsPage';

function App() {
  const [theme] = useLocalStorage('app_theme', 'light');
  const [token] = useLocalStorage('app_token', null);

  return (
    <div className={`theme-${theme}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Header />

        <div className="container mt-5" style={{ flex: 1, paddingBottom: '2rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/add-workshop" element={token ? <FormPage /> : <Navigate to="/login" />} />
            <Route path="/workshop/:id" element={<WorkshopDetailsPage />} />
            <Route path="/edit-workshop/:id" element={token ? <FormPage /> : <Navigate to="/login" />} />
            <Route path="/my-workshops" element={token ? <MyWorkshopsPage /> : <Navigate to="/login" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;