import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getWaterDaily,
  addWater,
  deleteWater,
  updateWater,
  getWaterMonthly,
} from './operations';

const initialState = {
  waterItemsOfDay: {
    dateOrMonth: '',
    data: [],
  },
  waterItemsOfMonthly: [],
  allWaterByDay: 0,
  date: null,
  //   loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.waterItemsOfDay.data.push(action.payload);
        state.allWaterByDay += action.payload.amountOfWater;
      })
      .addCase(getWaterDaily.fulfilled, (state, action) => {
        state.loading = false;
        state.waterItemsOfDay = action.payload;
      })
      .addCase(getWaterMonthly.fulfilled, (state, action) => {
        state.loading = false;
        state.waterItemsOfMonthly = action.payload.dailyResults;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        const index = state.waterItemsOfDay.data.findIndex(
          waterItem => waterItem._id === action.payload._id
        );
        if (index !== -1) {
          state.waterItemsOfDay.data.splice(index, 1);
        }
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        state.loading = false;
        const updatedWaterIndex = state.waterItemsOfDay.data.findIndex(
          waterItem => waterItem._id === action.payload._id
        );
        if (updatedWaterIndex !== -1) {
          state.waterItemsOfDay.data[updatedWaterIndex] = action.payload;
        }
      })
      .addMatcher(
        isAnyOf(
          addWater.pending,
          getWaterDaily.pending,
          getWaterMonthly.pending,
          deleteWater.pending,
          updateWater.pending
        ),
        state => {
          //   state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          addWater.rejected,
          getWaterDaily.rejected,
          getWaterMonthly.rejected,
          deleteWater.rejected,
          updateWater.rejected
        ),
        (state, action) => {
          //   state.loading = false;
          state.error = action.error?.message || 'An error occurred';
        }
      );
  },
});

export const waterReducer = waterSlice.reducer;
