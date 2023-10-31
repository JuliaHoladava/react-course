import React from 'react';
import { SearchBarProps, SearchBarState } from './interfaces';
import './SearchBar.css';
import './App.css';

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      localSearchTerm: '',
    };
  }

  componentDidMount() {
    const { setSearchTerm } = this.props;
    const storedSearchTerm = localStorage.getItem('lastSearch') || '';
    this.setState({ localSearchTerm: storedSearchTerm });
    setSearchTerm(storedSearchTerm);
  }

  handleSearch = () => {
    const { setSearchTerm } = this.props;
    const { localSearchTerm } = this.state;
    const trimmedTerm = localSearchTerm.trim();
    setSearchTerm(trimmedTerm);
    localStorage.setItem('lastSearch', trimmedTerm);
  };

  render() {
    const { localSearchTerm } = this.state;
    return (
      <div className="_container search-bar">
        <input
          className="input-search"
          type="text"
          value={localSearchTerm}
          onChange={(e) => this.setState({ localSearchTerm: e.target.value })}
        />
        <button
          className="button-search"
          type="submit"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
