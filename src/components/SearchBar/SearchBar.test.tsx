import { act, render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { SearchProvider } from '../SearchContext/SearchContext';

describe('SearchBar component', () => {
  let setItemMock: jest.SpyInstance;

  beforeEach(() => {
    setItemMock = jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.getItem = jest.fn().mockReturnValue('');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('saves the entered value to local storage on search', () => {
    // setItemMock = jest.spyOn(Storage.prototype, 'setItem');
    // Storage.prototype.getItem = jest.fn().mockReturnValue('');

    render(
      <SearchProvider>
        <SearchBar />
      </SearchProvider>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const searchButton = screen.getByRole('button', { name: 'Search' });

    act(() => {
      fireEvent.change(input, { target: { value: 'testing' } });
      fireEvent.click(searchButton);
    });

    expect(setItemMock).toHaveBeenCalledWith('lastSearch', 'testing');
  });

  it('retrieves the value from local storage on mount', () => {
    Storage.prototype.getItem = jest.fn().mockReturnValue('previous value');

    render(
      <SearchProvider>
        <SearchBar />
      </SearchProvider>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('previous value');
  });
});
