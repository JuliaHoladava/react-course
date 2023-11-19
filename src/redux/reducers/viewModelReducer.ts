import { AnyAction } from 'redux';
import { ViewModelState } from '../../type/interfaces';

const initialViewModelState: ViewModelState = {
  results: [],
  count: 0,
  page: 1,
  isLoading: false,
};

export const viewModelReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialViewModelState,
  action: AnyAction
): typeof initialViewModelState => {
  switch (action.type) {
    case 'SET_RESULTS':
      return { ...state, results: action.payload };
    case 'SET_COUNT':
      return { ...state, count: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const setResults = (results: []) => ({
  type: 'SET_RESULTS',
  payload: results,
});

export const setCount = (count: number) => ({
  type: 'SET_COUNT',
  payload: count,
});

export const setPage = (page: number) => ({
  type: 'SET_PAGE',
  payload: page,
});

export const setLoading = (isLoading: boolean) => ({
  type: 'SET_LOADING',
  payload: isLoading,
});
