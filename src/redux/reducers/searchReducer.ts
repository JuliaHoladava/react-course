import { AnyAction } from 'redux';

const initialState = {
  searchTerm: '',
};

export const searchReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: AnyAction
): typeof initialState => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload ? action.payload : state.searchTerm,
      };
    default:
      return state;
  }
};

export const setSearchTerm = (searchTerm: string) => ({
  type: 'SET_SEARCH_TERM',
  payload: searchTerm,
});
