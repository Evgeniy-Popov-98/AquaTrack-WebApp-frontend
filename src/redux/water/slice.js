import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getWaterDaily,
  getWaterMonthly,
  addWater,
  deleteWater,
} from './operations';
import { isSameDay } from 'date-fns';

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
        // state.loading = false;

        const newItem = action.payload;
        if (newItem) {
          state.waterItemsOfDay.data.push(newItem);
          state.allWaterByDay += newItem.amountOfWater;

          const newWaterDate = new Date(newItem.date);
          const waterByMonth = state.waterItemsOfMonthly.find(item =>
            isSameDay(new Date(item.date), newWaterDate)
          );
          if (waterByMonth) {
            waterByMonth.allWaterByDay += newItem.amountOfWater;
          } else {
            state.waterItemsOfMonthly.push({
              date: newItem.date,
              allWaterByDay: newItem.amountOfWater,
            });
          }
        }
      })
      .addCase(getWaterDaily.fulfilled, (state, action) => {
        // state.loading = false;
        // Ensure payload structure matches state structure
        state.waterItemsOfDay = action.payload || { dateOrMonth: '', data: [] };
        state.allWaterByDay = state.waterItemsOfDay.data.reduce(
          (total, item) => total + item.amountOfWater,
          0
        );
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.waterItemsOfDay.data = state.waterItemsOfDay.data.filter(
          waterItem => waterItem._id !== action.payload._id
        );
        // Update allWaterByDay to reflect changes
        state.allWaterByDay = state.waterItemsOfDay.data.reduce(
          (total, item) => total + item.amountOfWater,
          0
        );
      })
      .addMatcher(
        isAnyOf(addWater.pending, getWaterDaily.pending, deleteWater.pending),
        state => {
          //   state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          addWater.rejected,
          getWaterDaily.rejected,
          deleteWater.rejected
        ),
        (state, action) => {
          //   state.loading = false;
          state.error = action.error?.message || 'An error occurred';
        }
      );
  },
});

export const waterReducer = waterSlice.reducer;
