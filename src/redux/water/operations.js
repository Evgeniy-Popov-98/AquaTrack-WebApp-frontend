import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

export const getWaterDaily = createAsyncThunk(
  "water/getWaterDaily",
  async (date, thunkAPI) => {
    try {
      const response = await instance.get(`/water/daily/${date}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getWaterMonthly = createAsyncThunk(
  "water/getWaterMonthly",
  async (date, thunkAPI) => {
    try {
      const response = await instance.get(`/water/monthly/${date}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addWater = createAsyncThunk(
  "water/addWater",
  async (water, thunkAPI) => {
    try {
      const response = await instance.post("/water", water);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteWater",
  async (id, thunkAPI) => {
    try {
      const response = await instance.delete(`/water/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  "water/updateWater",
  async (data, thunkAPI) => {
    try {
      const response = await instance.patch(`/water/${data.id}`, {
        amountOfWater: data.amountLiters, 
        date: data.time
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);