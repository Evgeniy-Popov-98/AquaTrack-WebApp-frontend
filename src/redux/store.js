import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice.js';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
