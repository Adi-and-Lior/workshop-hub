import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import WorkshopDetailsPage from './pages/WorkshopDetailsPage';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {/* Wrapper - עוטף את הכל כדי שהפוטר יידבק לתחתית */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <nav 
          className="navbar" 
          role="navigation" 
          aria-label="main navigation"        >
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img 
                src="/logo.png" 
                alt="WorkShop Hub" 
                style={{ maxHeight: '60px' }} 
              />
            </Link>
            
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">קטלוג סדנאות</Link>
              
              {
              <Link to="/add-workshop" className="navbar-item">הוספת סדנה</Link>
              }
            </div>
          </div>
        </nav>

        {/* האזור הראשי - מקבל flex: 1 כדי למלא את הרווח עד הפוטר */}
        <div className="container mt-5" style={{ flex: 1, paddingBottom: '2rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {
            <Route path="/add-workshop" element={<FormPage />} />
            }
            
            <Route path="/workshop/:id" element={<WorkshopDetailsPage />} />
          </Routes>
        </div>

        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;