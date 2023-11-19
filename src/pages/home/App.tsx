import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Results from '../../components/Result-list/Results';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

const App = () => {
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
            element={
              <div>
                <SearchBar />
                <Results />
              </div>
            }
          />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
