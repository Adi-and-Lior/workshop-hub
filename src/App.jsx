import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import WorkshopDetailsPage from './pages/WorkshopDetailsPage';
import NotFoundPage from './pages/NotFoundPage'; // <-- Import 1
import Footer from './components/Footer';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext'; // <-- Import 2

// רכיב עזר קטן להצגת מונה המועדפים בנאבר
const FavoritesCounter = () => {
  const { favorites } = useFavorites();
  if (favorites.length === 0) return null;
  return (
    <span className="tag is-danger is-rounded is-light ml-2" style={{ fontWeight: 'bold' }}>
      {favorites.length} ❤
    </span>
  );
};

function App() {
  return (
    <FavoritesProvider> {/* <-- עטיפה ב-Provider */}
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                <img src="/logo.png" alt="WorkShop Hub" style={{ maxHeight: '60px' }} />
              </Link>
              {/* כאן אפשר להוסיף המבורגר אם רוצים */}
            </div>
            <div className="navbar-menu">
              <div className="navbar-start">
                <Link to="/" className="navbar-item">
                  קטלוג סדנאות 
                  <FavoritesCounter /> {/* שימוש ב-Context בנאבר */}
                </Link>
                <Link to="/add-workshop" className="navbar-item">הוספת סדנה</Link>
              </div>
            </div>
          </nav>

          <div className="container mt-5" style={{ flex: 1, paddingBottom: '2rem' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add-workshop" element={<FormPage />} />
              <Route path="/workshop/:id" element={<WorkshopDetailsPage />} />
              <Route path="*" element={<NotFoundPage />} /> {/* <-- הוספת נתיב 404 */}
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
export default App;