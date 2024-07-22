import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getWaterDaily,
  addWater,
  deleteWater,
  updateWater,
} from './operations';

const initialState = {
  waterItemsOfDay: {
    dateOrMonth: '',
    data: [],
  },
  waterItemsOfMonthly: [],
  allWaterByDay: 0,
  date: null,
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
        state.waterItemsOfDay = action.payload || { dateOrMonth: '', data: [] };
        state.allWaterByDay = action.payload?.data.reduce(
          (total, item) => total + item.amountOfWater,
          0
        );
      })

      .addCase(deleteWater.fulfilled, (state, action) => {
        const deletedItem = action.payload;
        const index = state.waterItemsOfDay.data.findIndex(
          waterItem => waterItem._id === deletedItem._id
        );
        if (index !== -1) {
          state.allWaterByDay -=
            state.waterItemsOfDay.data[index].amountOfWater; // Віднімаємо кількість води
          state.waterItemsOfDay.data.splice(index, 1);
        }
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload;
        const updatedWaterIndex = state.waterItemsOfDay.data.findIndex(
          waterItem => waterItem._id === updatedItem._id
        );
        if (updatedWaterIndex !== -1) {
          state.allWaterByDay -=
            state.waterItemsOfDay.data[updatedWaterIndex].amountOfWater; // Віднімаємо стару кількість води
          state.waterItemsOfDay.data[updatedWaterIndex] = updatedItem;
          state.allWaterByDay += updatedItem.amountOfWater; // Додаємо нову кількість води
        }
      })
      .addMatcher(
        isAnyOf(
          addWater.pending,
          getWaterDaily.pending,
          deleteWater.pending,
          updateWater.pending
        ),
        state => {
          // state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          addWater.rejected,
          getWaterDaily.rejected,
          deleteWater.rejected,
          updateWater.rejected
        ),
        (state, action) => {
          // state.loading = false;
          state.error = action.error?.message || 'An error occurred';
        }
      );
  },
});

export const waterReducer = waterSlice.reducer;
