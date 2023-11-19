import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../../redux/reducers/searchReducer';
import {
  setCount,
  setPage,
  setLoading,
} from '../../redux/reducers/viewModelReducer';
import { useFetchCharactersQuery } from '../../api/starWarsCharactersApi';
import { RootState } from '../../redux/store';
import './SearchBar.css';
import '../../pages/home/App.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state: RootState) => state.search);
  const { page } = useSelector((state: RootState) => state.viewModel);
  const { data, error, isLoading } = useFetchCharactersQuery({
    searchTerm,
    page,
  });

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('lastSearch') || '';
    dispatch(setSearchTerm(storedSearchTerm));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(setCount(data.count));
      dispatch(setPage(page));
    }
    dispatch(setLoading(isLoading));
  }, [data, isLoading, dispatch, page]);

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
      {error ? <p>Error loading data</p> : null}
      {isLoading ? <p>Loading...</p> : null}
    </div>
  );
};

export default SearchBar;
