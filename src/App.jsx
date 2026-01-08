import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import WorkshopDetailsPage from './pages/WorkshopDetailsPage';
import NotFoundPage from './pages/NotFoundPage'; 
import Footer from './components/Footer';
import Header from './components/Header'; 

function App() {
  const [theme] = useLocalStorage('app_theme', 'light');

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
            <Route path="/add-workshop" element={<FormPage />} />
            <Route path="/workshop/:id" element={<WorkshopDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;