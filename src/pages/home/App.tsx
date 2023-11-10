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
  const [isLoading, setIsLoading] = useState(false);

  const fetchPageResults = async (term: string, currentPage: number) => {
    setIsLoading(true);
    try {
      const fetchedResults = await fetchResults(term, currentPage);
      setResults(fetchedResults.results);
      setCount(fetchedResults.count);
    } catch (error) {
      console.error('Executing fetch error', error);
    } finally {
      setIsLoading(false);
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
        {isLoading && <div>Loading...</div>}
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
                  isLoading={isLoading}
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
