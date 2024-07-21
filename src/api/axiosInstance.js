import axios from 'axios';
import { store } from '../redux/store.js';
import { refreshUser } from '../redux/auth/operations.js';
import { isTokenExpired } from '../utils/jwt';

export const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setToken = (token) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  };
  
  export const clearToken = () => {
    instance.defaults.headers.common.Authorization = '';
  };

let refreshTokenRequest = null;

instance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;

    if (isTokenExpired(token)) {
      if (!refreshTokenRequest) {
        refreshTokenRequest = store.dispatch(refreshUser());
      }

      const resultAction = await refreshTokenRequest;
      if (refreshUser.fulfilled.match(resultAction)) {
        config.headers.Authorization = `Bearer ${resultAction.payload}`;
      } else {
        throw new axios.Cancel('Token refresh failed');
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Інтерсептор відповідей
instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        clearToken();
      }
      return Promise.reject(error);
    }
  );
  
  export default instance;


