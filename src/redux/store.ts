import { configureStore } from '@reduxjs/toolkit';
import { starWarsCharactersApi } from '../api/starWarsCharactersApi';
import { searchReducer } from './reducers/searchReducer';
import { viewModelReducer } from './reducers/viewModelReducer';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    viewModel: viewModelReducer,
    [starWarsCharactersApi.reducerPath]: starWarsCharactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsCharactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
