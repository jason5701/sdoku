import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import gridReducer from './featrues/slice';
import logger from 'redux-logger';
import type { TypedUseSelectorHook } from 'react-redux';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  // reducers
  grid: gridReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat([logger]);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector;
// export const useAppDispatch = () => useDispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
