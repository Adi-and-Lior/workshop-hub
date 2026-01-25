import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { useLocalStorage } from '../hooks/useLocalStorage';
import { clearFavorites } from '../store/favoritesSlice';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  
  const [theme, setTheme] = useLocalStorage('app_theme', 'light');
  const [token, setToken] = useLocalStorage('app_token', null);
  const [user, setUser] = useLocalStorage('app_user', null);
  
  const favoritesCount = useSelector((state) => state.favorites.totalCount);

  const lilacColor = '#dec9ff';
  const textColor = isBurgerActive ? '#4a4a4a' : (theme === 'light' ? '#4a4a4a' : '#fff');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    if (window.confirm('האם אתה בטוח שברצונך להתנתק?')) {
      setToken(null);
      setUser(null);
      setIsBurgerActive(false);
      navigate('/');
    }
  };

  return (
    <nav 
      className="navbar is-fixed-top" 
      role="navigation" 
      aria-label="main navigation" 
      style={{ 
        direction: 'rtl', 
        backgroundColor: isBurgerActive ? lilacColor : '', 
        transition: 'background-color 0.3s ease'
      }}
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" onClick={() => setIsBurgerActive(false)}>
          <img src="/logo.png" alt="WorkShop Hub" style={{ maxHeight: '60px' }} />
        </Link>

        <a 
          role="button" 
          className={`navbar-burger ${isBurgerActive ? 'is-active' : ''}`}
          onClick={() => setIsBurgerActive(!isBurgerActive)}
          style={{ marginRight: 'auto', marginLeft: '0', color: textColor }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div 
        className={`navbar-menu ${isBurgerActive ? 'is-active' : ''}`}
        style={{ 
          backgroundColor: isBurgerActive ? lilacColor : '',
          boxShadow: isBurgerActive ? 'none' : ''
        }}
      >
        <div className="navbar-start">
          <Link to="/" className="navbar-item" style={{ color: textColor }} onClick={() => setIsBurgerActive(false)}>
            קטלוג סדנאות 
            <FavoritesCounter />
          </Link>
          
          {token && (
            <>
              <Link to="/my-workshops" className="navbar-item" style={{ color: textColor }} onClick={() => setIsBurgerActive(false)}>הסדנאות שלי 🛠️</Link>
              <Link to="/add-workshop" className="navbar-item" style={{ color: textColor }} onClick={() => setIsBurgerActive(false)}>הוספת סדנה</Link>
            </>
          )}
        </div>

        <div className="navbar-end">
          {token ? (
            <div className="navbar-item is-flex is-align-items-center">
              <span className="ml-4" style={{ color: textColor, fontWeight: '500' }}>
                שלום, {user?.username}
              </span>
              <button 
                onClick={handleLogout}
                className="button is-small is-rounded is-danger is-outlined"
                style={{ fontWeight: 'bold', backgroundColor: isBurgerActive ? 'white' : '' }}
              >
                התנתקות 👋
              </button>
            </div>
          ) : (
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/register" className="button is-primary is-small" onClick={() => setIsBurgerActive(false)}><strong>הרשמה</strong></Link>
                <Link to="/login" className="button is-light is-small" onClick={() => setIsBurgerActive(false)}>התחברות</Link>
              </div>
            </div>
          )}

          <div className="navbar-item">
            <button className="button is-rounded is-small is-light" onClick={toggleTheme}>
              {theme === 'light' ? '☀️ יום' : '🌙 לילה'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}