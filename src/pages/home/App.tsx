import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Results from '../../components/Result-list/Results';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { SearchProvider } from '../../components/SearchContext/SearchContext';

const App = () => {
  return (
    <BrowserRouter>
      <SearchProvider>
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
            <Route path="/" element={<SearchBar />}>
              <Route index element={<Results />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </SearchProvider>
    </BrowserRouter>
  );
};

export default App;
