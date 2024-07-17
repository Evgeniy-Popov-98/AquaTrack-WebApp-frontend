import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiRequest from '../../api/apiRequest';

export const instance = axios.create({
  baseURL: 'https://aquatrack-webapp-backend.onrender.com',
  // baseURL: 'http://localhost:3000',
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  console.log('Token set:', instance.defaults.headers.common.Authorization);
};

export const clearToken = () =>
  (instance.defaults.headers.common.Authorization = '');

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/register', formData);
      setToken(data.data.accessToken);

      return data.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const { data } = await apiRequest('post', '/users/login', formData);
      setToken(data.data.accessToken);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh-tokens',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.accessToken;
      const userId = state.auth.user.userId;

      if (token === null) {
        return thunkApi.rejectWithValue('Unable to fetch user');
      }

      setToken(token);

      const { data } = await instance.get(`/users/${userId}`);

      setToken(token);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await instance.post('/users/logout');
    clearToken();

    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
