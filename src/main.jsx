// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'; // ייבוא ה-Provider של Redux
import { store } from './store/store'; // ייבוא ה-Store שיצרנו
import App from './App.jsx'
import 'bulma/css/bulma.min.css';
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)