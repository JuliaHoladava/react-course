import { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { SearchContext } from '../SearchContext/SearchContext';
import './SearchBar.css';
import '../../pages/home/App.css';

const SearchBar = () => {
  const context = useContext(SearchContext);

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('lastSearch') || '';
    if (context) {
      context.setSearchTerm(storedSearchTerm);
    }
  }, [context]);

  const handleSearch = () => {
    if (context) {
      const trimmedTerm = context.searchTerm.trim();
      context.setSearchTerm(trimmedTerm);
      localStorage.setItem('lastSearch', trimmedTerm);
    }
  };

  if (!context) {
    return null;
  }

  return (
    <div className="_container search-bar">
      <input
        className="input-search"
        type="text"
        value={context.searchTerm}
        onChange={(e) => context.setSearchTerm(e.target.value)}
      />
      <button className="button-search" type="submit" onClick={handleSearch}>
        Search
      </button>
      <Outlet />
    </div>
  );
};

export default SearchBar;
