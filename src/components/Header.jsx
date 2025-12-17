import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesCounter = () => {
  const { favorites } = useFavorites();
  if (favorites.length === 0) return null;
  return (
    <span className="tag is-danger is-rounded is-light ml-2" style={{ fontWeight: 'bold' }}>
      {favorites.length} ❤
    </span>
  );
};

export default function Header() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src="/logo.png" alt="WorkShop Hub" style={{ maxHeight: '60px' }} />
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            קטלוג סדנאות 
            <FavoritesCounter />
          </Link>
          <Link to="/add-workshop" className="navbar-item">הוספת סדנה</Link>
        </div>
      </div>
    </nav>
  );
}