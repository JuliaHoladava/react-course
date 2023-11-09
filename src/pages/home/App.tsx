import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Results from '../../components/Result-list/Results';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import fetchResults from '../../api/FetchResult';

const App = () => {
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPageResults = async (term: string, currentPage: number) => {
    try {
      const fetchedResults = await fetchResults(term, currentPage);
      setResults(fetchedResults.results);
      setCount(fetchedResults.count);
    } catch (error) {
      console.error('Executing fetch error', error);
    }
  };

  useEffect(() => {
    fetchPageResults(searchTerm, page);
  }, [searchTerm, page]);

  const handleSetSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
    setPage(1);
  }, []);

  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

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
              element={
                <Results
                  initialResults={results}
                  count={count}
                  page={page}
                  goToPage={goToPage}
                />
              }
            />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
