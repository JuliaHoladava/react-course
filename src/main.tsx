import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/home/App';
import { SearchProvider } from './components/SearchContext/SearchContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>
);
