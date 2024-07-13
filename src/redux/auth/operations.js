import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'myURL',
});

// export const setToken = token => {
//   instance.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// export const clearToken = () =>
//   (instance.defaults.headers.common.Authorization = '');

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/register', formData);
    //   setToken(data.token);

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/login', formData);
    //   setToken(data.token);

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh-tokens',
  async (_, thunkApi) => {
    try {
    //   const state = thunkApi.getState();
    //   const token = state.auth.token;

    //   setToken(token);
      const { data } = await instance.get('/users/current');

      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
