import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SearchBarProps } from './interfaces';
import './SearchBar.css';
import './App.css';

const SearchBar = ({ setSearchTerm }: SearchBarProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('lastSearch') || '';
    setLocalSearchTerm(storedSearchTerm);
    setSearchTerm(storedSearchTerm);
  }, [setSearchTerm]);

  const handleSearch = () => {
    const trimmedTerm = localSearchTerm.trim();
    setSearchTerm(trimmedTerm);
    localStorage.setItem('lastSearch', trimmedTerm);
  };

  return (
    <div className="_container search-bar">
      <input
        className="input-search"
        type="text"
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
      />
      <button className="button-search" type="submit" onClick={handleSearch}>
        Search
      </button>
      <Outlet />
    </div>
  );
};

export default SearchBar;
