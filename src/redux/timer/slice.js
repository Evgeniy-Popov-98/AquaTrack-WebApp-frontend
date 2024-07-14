import { createSlice } from '@reduxjs/toolkit';

const INITAL_STATE = {
  timer: 0,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState: INITAL_STATE,
  reducers: {
    incrementTimer(state) {
      state.timer += 1;
    },
  },
});

export const { incrementTimer } = timerSlice.actions;

export const timerReducer = timerSlice.reducer;
