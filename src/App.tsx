import { useCallback, useState } from 'react';
import SearchBar from './SearchBar';
import Results from './Results';
import ErrorBoundary from './ErrorBoundary';

async function fetchResults(searchTerm: string) {
  const url = `https://swapi.dev/api/people/?search=${searchTerm}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.results;
}

const App = () => {
  const [results, setResults] = useState([]);

  const handleSetSearchTerm = useCallback(async (term: string) => {
    try {
      const fetchedResults = await fetchResults(term);
      setResults(fetchedResults);
    } catch (error) {
      console.error('Executing request error', error);
    }
  }, []);

  return (
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
      <SearchBar setSearchTerm={handleSetSearchTerm} />
      <Results results={results} />
    </ErrorBoundary>
  );
};

export default App;
