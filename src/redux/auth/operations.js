import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../api/axiosInstance.js';

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/register', formData);
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
      const { data } = await instance.post('/users/login', formData);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getAuthUrl = createAsyncThunk(
  'auth/google-url',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.post('/users/get-oauth-url');
      return data.data.url;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const verifyGoogleOAuth = createAsyncThunk(
  'auth/google-verify',
  async ({ code }, thunkApi) => {
    try {
      const { data } = await instance.post('/users/verify-google-oauth', {
        code,
      });
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshSettingInterceptors = store => {
  //   instance.interceptors.response.use(
  //     response => response,
  //     async error => {
  //       if (error.response.status === 401) {
  //         try {
  //           refreshUser();
  //         } catch (error) {
  //           return Promise.reject(error);
  //         }
  //       }
  //     }
  //   );
};

export const refreshUser = createAsyncThunk(
  'auth/refresh-tokens',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.post('/users/refresh-tokens');
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await instance.post('/users/logout');
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  'auth/current',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/users/current');
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/update',
  async (user, thunkAPI) => {
    try {
      const { data } = await instance.patch('/users/update', user, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      //   setToken(data.data.accessToken);
      console.log('Response data:', data);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
