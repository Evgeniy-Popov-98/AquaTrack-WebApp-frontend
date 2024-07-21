import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  //   refreshUser,
  register,
  logout,
  getUser,
  updateUser,
  verifyGoogleOAuth,
  getAuthUrl,
} from './operations';

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
    gender: null,
    weight: null,
    activeSportsTime: null,
    dailyWaterIntake: 1.5,
    avatar: null,
  },
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: null,
  url: '',
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

  extraReducers: builder => {
    builder
      //register
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(register.rejected, handleRejected)
      //login
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, handleRejected)
      // //google-url
      .addCase(getAuthUrl.pending, handlePending)
      .addCase(getAuthUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.url = action.payload;
      })
      .addCase(getAuthUrl.rejected, handleRejected)
      //google-verify
      .addCase(verifyGoogleOAuth.pending, handlePending)
      .addCase(verifyGoogleOAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          avatar: action.payload.avatar,
        };
        state.accessToken = action.payload.accessToken;
      })
      .addCase(verifyGoogleOAuth.rejected, handleRejected)
      //refresh
      //   .addCase(refreshUser.pending, handlePending, state => {
      //     state.isRefreshing = true;
      //   })
      //   .addCase(refreshUser.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.isRefreshing = false;
      //     state.isLoggedIn = true;
      //     state.accessToken = action.payload;
      //   })
      //   .addCase(refreshUser.rejected, handleRejected, state => {
      //     state.isRefreshing = true;
      //   })
      // logout
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(logout.rejected, handleRejected)
      // getUser
      .addCase(getUser.pending, handlePending)
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, handleRejected)
      // updateUser
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
