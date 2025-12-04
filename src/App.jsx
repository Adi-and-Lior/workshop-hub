import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import HomePage from './pages/HomePage';  <-- שמתי בהערה זמנית
// import FormPage from './pages/FormPage';  <-- שמתי בהערה זמנית
// import WorkshopDetailsPage from './pages/WorkshopDetailsPage'; <-- שמתי בהערה זמנית

function App() {
  return (
    <BrowserRouter>
      {/* --- התחלת ה-Navbar --- */}
      <nav className="navbar" role="navigation" aria-label="main navigation">
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

        <div className="navbar-menu is-active">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">קטלוג סדנאות</Link>
            <Link to="/add-workshop" className="navbar-item">הוספת סדנה</Link>
          </div>
        </div>
      </nav>

      {/* --- תוכן זמני לבדיקה --- */}
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<h1> זה דף הבית (העיצוב עובד?)</h1>} />
          <Route path="/add-workshop" element={<h1>כאן יהיה הטופס</h1>} />
          <Route path="/workshop/:id" element={<h1>כאן יהיו פרטים</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;