import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getWaterDaily } from "../water/operations.js";
import { getWaterMonthly } from "../water/operations.js";
import { addWater } from "../water/operations.js";
import { deleteWater } from "../water/operations.js";
import { updateWater } from "../water/operations.js";
import toast from "react-hot-toast";

const initialState = {
  waterDaily: [],
  waterMonthly: [],
  loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWaterDaily.fulfilled, (state, action) => {
        state.loading = false;
        state.waterDaily = action.payload;
      })
      .addCase(getWaterMonthly.fulfilled, (state, action) => {
        state.loading = false;
        state.waterMonthly = action.payload;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        if (state.waterDaily.length > 0 && state.waterDaily[0].createdAt === action.payload.createdAt) {
            state.waterDaily.push(action.payload);
            toast("Water added.");
          }
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.waterDaily = state.waterDaily.filter(
          (item) => item.id !== action.payload.id
        );
        toast("Water deleted.");
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.waterDaily.findIndex(
          (item) => item.id === action.payload.id
        );
        state.waterDaily.splice(index, 1, action.payload);
        toast("Water updated.");
      })
      .addMatcher(
        isAnyOf(
          getWaterDaily.pending,
          getWaterMonthly.pending,
          addWater.pending,
          deleteWater.pending,
          updateWater.pending,
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getWaterDaily.rejected,
          getWaterMonthly.rejected,
          addWater.rejected,
          deleteWater.rejected,
          updateWater.rejected,
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const waterReducer = waterSlice.reducer;