import axios from 'axios';
import { store } from '../redux/store';
import { refreshUser } from '../redux/auth/operations';

export const instance = axios.create({
  baseURL: 'https://aquatrack-webapp-backend.onrender.com',
  // baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
};

let isRefreshing = false;
let pendingRequests = [];

const processQueue = (error, token = null) => {
  pendingRequests.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  pendingRequests = [];
};

instance.interceptors.request.use(
  async config => {
    if (!config.url.includes('/users/register') && !config.url.includes('/users/login')) {
      const state = store.getState();
      const token = state.auth.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.config.url.includes('/users/refresh-tokens') &&
      (error.response.status === 400 || error.response.status === 401)
    ) {
      clearToken();
      const state = store.getState();
      state.auth.accessToken = null;
      state.auth.isLoggedIn = false;
      window.localStorage.removeItem('persist:auth');
      return Promise.reject(error);
    }

    if (
      error.response &&
      !error.response.config.url.includes('/users/refresh-tokens') &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return instance(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        store.dispatch(refreshUser()).then(resultAction => {
          if (refreshUser.fulfilled.match(resultAction)) {
            setToken(resultAction.payload.accessToken);
            originalRequest.headers.Authorization = `Bearer ${resultAction.payload.accessToken}`;
            processQueue(null, resultAction.payload.accessToken);
            resolve(instance(originalRequest));
          } else {
            clearToken();
            processQueue(resultAction.payload, null);
            reject(resultAction.payload);
          }
        })
        .catch(refreshError => {
          clearToken();
          processQueue(refreshError, null);
          reject(refreshError);
        })
        .finally(() => {
          isRefreshing = false;
        });
      });
    }

    return Promise.reject(error);
  }
);