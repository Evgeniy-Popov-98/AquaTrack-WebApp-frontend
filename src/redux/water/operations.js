import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../auth/operations';

export const getWaterDaily = createAsyncThunk(
  'water/getWaterDaily',
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
  'water/getWaterMonthly',
  async (date, thunkAPI) => {
    try {
      const { data } = await instance.get(`/water/monthly/${date}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addWater = createAsyncThunk(
  'water/addWater',
  async (water, thunkAPI) => {
    try {
      const response = await instance.post('/water', water);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
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
  'water/updateWater',
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await instance.patch(`/water/${id}`, data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWaterById = createAsyncThunk(
  'water/fetchWaterById',
  async (id, thunkAPI) => {
    try {
      const response = await instance.get(`/water/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
