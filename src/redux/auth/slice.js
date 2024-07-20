import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  refreshUser,
  register,
  logout,
  getUser,
  updateUser,
} from './operations';
import { login, refreshUser, register, verifyGoogleOAuth } from './operations';

const INITIAL_STATE = {
  user: {
    email: null,
    gender: null,
    weight: null,
    activeSportsTime: null,
    dailyWaterIntake: null,
    avatar: null,
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

  extraReducers: builder => {
    builder
      //register
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        // state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(register.rejected, handleRejected)
      //login
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        // state.user = action.payload.user;
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
        // state.user = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(refreshUser.rejected, handleRejected, state => {
        state.isRefreshing = true;
      })
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
        state.user._id = action.payload.user._id;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.gender = action.payload.user.gender;
        state.user.weight = action.payload.user.weight;
        state.user.activeSportsTime = action.payload.user.activeSportsTime;
        state.user.dailyWaterIntake = action.payload.user.dailyWaterIntake;
        state.user.avatar = action.payload.user.avatar;
      })
      .addCase(getUser.rejected, handleRejected)
      // updateUser
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user._id = action.payload.user._id;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.gender = action.payload.user.gender;
        state.user.weight = action.payload.user.weight;
        state.user.activeSportsTime = action.payload.user.activeSportsTime;
        state.user.dailyWaterIntake = action.payload.user.dailyWaterIntake;
        state.user.avatar = action.payload.user.avatar;
      })
      .addCase(updateUser.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
