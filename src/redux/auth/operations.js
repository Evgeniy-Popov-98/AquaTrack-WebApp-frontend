import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiRequest from '../../api/apiRequest';

export const instance = axios.create({
  baseURL: 'https://aquatrack-webapp-backend.onrender.com',
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () =>
  (instance.defaults.headers.common.Authorization = '');

// export const register = createAsyncThunk(
//   'auth/register',
//   async (formData, thunkApi) => {
//     try {
//       const { data } = await instance.post('/users/register', formData);
//       setToken(data.token);

//       return data;
//     } catch (e) {
//       return thunkApi.rejectWithValue(e.message);
//     }
//   }
// );

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    const { data, error } = await apiRequest(
      'post',
      '/users/register',
      formData
    );

    if (data) {
      setToken(data.token);
      return data;
    } else {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// export const login = createAsyncThunk(
//   'auth/login',
//   async (formData, thunkApi) => {
//     try {
//       const { data } = await instance.post('/users/login', formData);
//       setToken(data.token);

//       return data;
//     } catch (e) {
//       return thunkApi.rejectWithValue(e.message);
//     }
//   }
// );

export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkApi) => {
    const { data, error } = await apiRequest('post', '/users/login', formData);
    if (data) {
      setToken(data.token);
      return data;
    } else {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// export const refreshUser = createAsyncThunk(
//   'auth/refresh-tokens',
//   async (_, thunkApi) => {
//     try {
//       const state = thunkApi.getState();
//       const token = state.auth.token;
//       const userId = state.auth.user.id;

//       setToken(token);
//       const { data } = await instance.get(`/users/${userId}`);

//       return data;
//     } catch (e) {
//       return thunkApi.rejectWithValue(e.message);
//     }
//   }
// );

export const refreshUser = createAsyncThunk(
  'auth/refresh-tokens',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;
    const userId = state.auth.user.id;

    if (token === null) {
      return thunkApi.rejectWithValue('Unable to fetch user');
    }

    setToken(token);
    const { data, error } = await apiRequest('get', `/users/${userId}`);

    if (data) {
      return data;
    } else {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await instance.post("/users/logout");
    clearToken();
    return;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
