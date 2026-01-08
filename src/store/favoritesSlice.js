import { createSlice } from '@reduxjs/toolkit';

const savedItems = JSON.parse(localStorage.getItem('workshop_favorites')) || [];

const initialState = {
  items: savedItems,       
  totalCount: savedItems.length, 
  lastUpdated: new Date().toISOString() 
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter(itemId => itemId !== id);
      } else {
        state.items.push(id);
      }
      state.totalCount = state.items.length;
      state.lastUpdated = new Date().toISOString();
      localStorage.setItem('workshop_favorites', JSON.stringify(state.items));
    },

    clearFavorites: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.lastUpdated = new Date().toISOString();
      localStorage.setItem('workshop_favorites', JSON.stringify([]));
    },

    setFavorites: (state, action) => {
      state.items = action.payload;
      state.totalCount = action.payload.length;
      state.lastUpdated = new Date().toISOString();
      localStorage.setItem('workshop_favorites', JSON.stringify(action.payload));
    }
  },
});

export const { toggleFavorite, clearFavorites, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;