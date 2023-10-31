import React from 'react';
import SearchBar from './SearchBar';
import Results from './Results';
import { AppState } from './interfaces';
import ErrorBoundary from './ErrorBoundary';

async function fetchResults(searchTerm: string) {
  const url = `https://swapi.dev/api/people/?search=${searchTerm}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.results;
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
    };
  }

  setSearchTerm = async (term: string) => {
    this.setState({ searchTerm: term });

    try {
      const results = await fetchResults(term);
      this.setState({ results });
    } catch (error) {
      console.error('Executing request error', error);
    }
  };

  render() {
    const { results } = this.state;
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
        <SearchBar setSearchTerm={this.setSearchTerm} />
        <Results results={results} />
      </ErrorBoundary>
    );
  }
}

export default App;
