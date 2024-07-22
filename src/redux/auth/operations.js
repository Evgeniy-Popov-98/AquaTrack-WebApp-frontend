import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { isTokenExpired } from '../../utils/jwt';
// import apiRequest from '../../api/apiRequest';

export const instance = axios.create({
  //   baseURL: 'https://aquatrack-webapp-backend.onrender.com',
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
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
      const { data } = await instance.post('/users/login', formData);
      setToken(data.data.accessToken);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// let refreshTokenRequest = null;

// export const refreshUser = createAsyncThunk(
//   'auth/refresh-tokens',
//   async (_, thunkApi) => {
//     try {
//       const state = thunkApi.getState();
//       const token = state.auth.accessToken;
//       if (!token) throw new Error('No token found');
//       setToken(token);
//       const {data} = await instance.post("/users/refresh-tokens");
//       setToken(data.data.accessToken);

//       return data.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );
//-----------------------не забути розкоментувати
// export const refreshUser = createAsyncThunk(
//   'auth/refresh-tokens',
//   async (_, thunkApi) => {
//     try {
//       const state = thunkApi.getState();
//       const token = state.auth.accessToken;

//       if (!token || isTokenExpired(token)) {
//         if (!refreshTokenRequest) {
//           refreshTokenRequest = instance.post('/users/refresh-tokens');
//         }

//         const res = await refreshTokenRequest;
//         setToken(res.data.data.accessToken);

//         return res.data.data.accessToken;
//       }

//       return token;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     } finally {
//       refreshTokenRequest = null; // Переміщення цієї лінії сюди забезпечує скидання змінної навіть у випадку помилки
//     }
//   }
// );

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
    const state = thunkApi.getState();
    const token = state.auth.accessToken;

    if (token === null) {
      return thunkApi.rejectWithValue('Unable to fetch user');
    }
    try {
      setToken(token);
      const response = await instance.post('/users/refresh-tokens');

      const { data } = response;
      setToken(data.data.accessToken);

      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const reduxState = getState();
      const savedToken = reduxState.auth.accessToken;
      return savedToken !== null;
    },
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await instance.post('/users/logout');
    clearToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getUser = createAsyncThunk('auth/current', async (_, thunkAPI) => {
  try {
    const { data } = await instance.get('/users/current');

    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const updateUser = createAsyncThunk(
  'auth/update',
  async (user, thunkAPI) => {
    try {
      const { data } = await instance.patch('/users/update', user, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setToken(data.data.accessToken);
      console.log('Response data:', data);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
