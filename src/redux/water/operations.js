import { createAsyncThunk } from '@reduxjs/toolkit';
// import { instance } from '../auth/operations';
import apiRequest from '../../api/apiRequest';

// export const getWaterDaily = createAsyncThunk(
//   "water/getWaterDaily",
//   async (date, thunkAPI) => {
//     try {
//       const response = await instance.get(`/water/daily/${date}`);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const getWaterMonthly = createAsyncThunk(
//   "water/getWaterMonthly",
//   async (date, thunkAPI) => {
//     try {
//       const response = await instance.get(`/water/monthly/${date}`);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const addWater = createAsyncThunk(
//   "water/addWater",
//   async (water, thunkAPI) => {
//     try {
//       const response = await instance.post("/water", water);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const deleteWater = createAsyncThunk(
//   "water/deleteWater",
//   async (id, thunkAPI) => {
//     try {
//       const response = await instance.delete(`/water/${id}`);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const updateWater = createAsyncThunk(
//   "water/updateWater",
//   async (data, thunkAPI) => {
//     try {
//       const response = await instance.patch(`/water/${data.id}`, {
//         amountOfWater: data.amountLiters,
//         date: data.time
//       });
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );
export const getWaterDaily = createAsyncThunk(
  'water/getWaterDaily',
  async (date, thunkAPI) => {
    const { data, error } = await apiRequest('get', `/water/daily/${date}`);

    if (data) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getWaterMonthly = createAsyncThunk(
  'water/getWaterMonthly',
  async (date, thunkAPI) => {
    const { data, error } = await apiRequest('get', `/water/monthly/${date}`);

    if (data) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addWater = createAsyncThunk(
  'water/addWater',
  async (water, thunkAPI) => {
    const { data, error } = await apiRequest('post', '/water', water);

    if (data) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkAPI) => {
    const { data, error } = await apiRequest('delete', `/water/${id}`);

    if (data) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateWater = createAsyncThunk(
  'water/updateWater',
  async (data, thunkAPI) => {
    const { data: updatedData, error } = await apiRequest(
      'patch',
      `/water/${data.id}`,
      {
        amountOfWater: data.amountLiters,
        date: data.time,
      }
    );

    if (updatedData) {
      return updatedData;
    } else {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
