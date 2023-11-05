import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchBar from './SearchBar';
import Results from './Results';
import ErrorBoundary from './ErrorBoundary';
import fetchResults from './FetchResult';

const App = () => {
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPageResults = useCallback(
    async (term: string, currentPage: number) => {
      try {
        const fetchedResults = await fetchResults(term, currentPage);
        setResults(fetchedResults.results);
        setCount(fetchedResults.count);
      } catch (error) {
        console.error('Executing fetch error', error);
      }
    },
    []
  );

  useEffect(() => {
    fetchPageResults(searchTerm, page);
  }, [fetchPageResults, searchTerm, page]);

  const handleSetSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
    setPage(1);
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <button
          className="button-error"
          type="button"
          onClick={() => {
            throw new Error('Test error');
          }}
        >
          Generate Error
        </button>
        <Routes>
          <Route
            path="/"
            element={<SearchBar setSearchTerm={handleSetSearchTerm} />}
          >
            <Route
              index
              element={<Results results={results} count={count} />}
            />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
