import { combineReducers, configureStore } from '@reduxjs/toolkit';
import postReducer from '../slice/postsSlice';
import filtersReducer from '../slice/filtersSlice';
export const rootReducer = combineReducers({
  postReducer,
  filtersReducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
export type AppState = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppState['dispatch'];
