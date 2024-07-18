import { createSlice } from '@reduxjs/toolkit';
import { login, refreshUser, register, verifyGoogleOAuth } from './operations';

const INITIAL_STATE = {
  user: {
    _id: null,
    email: null,
  },
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: null,
};

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,

  extraReducers: builder =>
    builder
      //register
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(register.rejected, handleRejected)
      //login
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, handleRejected)
      //google
      .addCase(verifyGoogleOAuth.pending, handlePending)
      .addCase(verifyGoogleOAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(verifyGoogleOAuth.rejected, handleRejected)
      //refresh
      .addCase(refreshUser.pending, handlePending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isRefreshing = false;
        state.isLoggedIn = true;

        state.user = action.payload;
      })
      .addCase(refreshUser.rejected, handleRejected, state => {
        state.isRefreshing = true;
      }),
});

export const authReducer = authSlice.reducer;
