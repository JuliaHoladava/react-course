import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../../redux/reducers/searchReducer';
import { RootState } from '../../redux/store';
import './SearchBar.css';
import '../../pages/home/App.css';

const SearchBar = () => {
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('lastSearch') || '';
    dispatch(setSearchTerm(storedSearchTerm));
  }, [dispatch]);

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    dispatch(setSearchTerm(trimmedTerm));
    localStorage.setItem('lastSearch', trimmedTerm);
  };

  return (
    <div className="_container search-bar">
      <input
        className="input-search"
        type="text"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <button className="button-search" type="submit" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
