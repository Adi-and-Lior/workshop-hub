import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import FormPage from './pages/FormPage'; // נחזיר רק שהקובץ יהיה מוכן
import WorkshopDetailsPage from './pages/WorkshopDetailsPage';

function App() {
  return (
    <BrowserRouter
      // דגלים לביטול אזהרות עתידיות של React Router v7
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            {/* הלוגו המקומי מתיקיית public */}
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
            
            {/* קישור לדף הוספת
            <Link to="/add-workshop" className="navbar-item">הוספת סדנה</Link>
            */}
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* הראוטר לדף הוספה
          <Route path="/add-workshop" element={<FormPage />} />
          */}
          
          <Route path="/workshop/:id" element={<WorkshopDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;