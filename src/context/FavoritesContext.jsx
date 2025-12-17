// src/context/FavoritesContext.jsx
import React, { createContext, useState, useContext } from 'react';

// 1. יצירת ה-Context
const FavoritesContext = createContext();

// 2. יצירת Provider
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); // שומר את ה-ID של הסדנאות האהובות

  // פונקציה להוספה/הסרה של מועדפים
  const toggleFavorite = (workshopId) => {
    setFavorites((prev) => {
      if (prev.includes(workshopId)) {
        return prev.filter((id) => id !== workshopId); // הסרה
      } else {
        return [...prev, workshopId]; // הוספה
      }
    });
  };

  const isFavorite = (workshopId) => favorites.includes(workshopId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// 3. Hook מותאם לשימוש קל
export const useFavorites = () => useContext(FavoritesContext);