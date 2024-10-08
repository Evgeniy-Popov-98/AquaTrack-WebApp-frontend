import { createSlice } from '@reduxjs/toolkit';

const INITAL_STATE = {
  currentDate: new Date().toISOString(),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: INITAL_STATE,
  reducers: {
    setDate: (state, action) => {
      const { year, month, date } = action.payload;
      const newDate = new Date(year, month, date + 1);
      state.currentDate = newDate.toISOString();
    },
    changeMonth: (state, action) => {
      const currentDate = new Date(state.currentDate);
      currentDate.setMonth(currentDate.getMonth() + action.payload);
      state.currentDate = currentDate.toISOString();
    },
  },
});

export const { setDate, changeMonth } = calendarSlice.actions;

export const calendarReducer = calendarSlice.reducer;
