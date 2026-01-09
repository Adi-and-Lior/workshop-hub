import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoritesCounter = () => {
  const count = useSelector((state) => state.favorites.totalCount);
  
  if (count === 0) return null;
  return (
    <span className="tag is-danger is-rounded is-light ml-2" style={{ fontWeight: 'bold' }}>
      {count} ❤
    </span>
  );
};

export default function Header() {
  const [theme, setTheme] = useLocalStorage('app_theme', 'light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src="/logo.png" alt="WorkShop Hub" style={{ maxHeight: '60px' }} />
        </Link>
      </div>

      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            קטלוג סדנאות 
            <FavoritesCounter />
          </Link>
          <Link to="/add-workshop" className="navbar-item">הוספת סדנה</Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <button 
              className="button is-rounded is-small is-light" 
              onClick={toggleTheme}
              title="החלף מצב תצוגה"
            >
              {theme === 'light' ? '☀️ יום' : '🌙 לילה'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}