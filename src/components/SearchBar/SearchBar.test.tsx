import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { searchReducer } from '../../redux/reducers/searchReducer';
import { viewModelReducer } from '../../redux/reducers/viewModelReducer';
import { starWarsCharactersApi } from '../../api/starWarsCharactersApi';

const testStore = configureStore({
  reducer: {
    search: searchReducer,
    viewModel: viewModelReducer,
    [starWarsCharactersApi.reducerPath]: starWarsCharactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsCharactersApi.middleware),
});

describe('SearchBar component', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.getItem = jest.fn().mockReturnValue('');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('saves the entered value to local storage on search', () => {
    render(
      <Provider store={testStore}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'testing' } });
    fireEvent.click(searchButton);

    expect(localStorage.setItem).toHaveBeenCalledWith('lastSearch', 'testing');
  });

  it('retrieves the value from local storage on mount', () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue('previous value');

    render(
      <Provider store={testStore}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('previous value');
  });
});
