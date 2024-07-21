import axios from 'axios';
import { store } from '../redux/store';
import { refreshUser } from '../redux/auth/operations';
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
      if (!token) throw new Error('No token found');
      console.log('Current Token: ', token);
  
      //=============================
      if (isTokenExpired(token)) {
        //=======================
        if (!refreshTokenRequest) {
          console.log('Token is expired, requesting new one...');
          refreshTokenRequest = store.dispatch(refreshUser()).then((resultAction) => {
            if (refreshUser.fulfilled.match(resultAction)) {
              setToken(resultAction.payload.accessToken);
              console.log('New Token received: ', resultAction.payload.accessToken);
              return resultAction.payload.accessToken;
            } else {
              throw new axios.Cancel('Token refresh failed');
            }
          }).finally(() => {
            refreshTokenRequest = null;
          });
        }
        //========================
  
        const newToken = await refreshTokenRequest;
        config.headers.Authorization = `Bearer ${newToken}`;
      } else {
        console.log('Token is valid.');
        config.headers.Authorization = `Bearer ${token}`;
      }
      //==============================
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized, clearing token.');
        clearToken();
      }
      return Promise.reject(error);
    }
  );