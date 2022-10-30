import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import shippingService from './shippingService';

const initialState = {
  shippingCountries: [],
  shippingSubdivisions: {},
  shipping: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// GET SHIPPING COUNTRIES
// PUBLIC
export const getShippingCountries = createAsyncThunk(
  'shipping/get-shipping-countries',
  async (_, thunkAPI) => {
    try {
      return await shippingService.getShippingCountries();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET SHIPPING SUBDIVISIONS
// PUBLIC
export const getShippingSubdivisions = createAsyncThunk(
  'shipping/get-shipping-subdivisions',
  async (chktCntryData, thunkAPI) => {
    try {
      return await shippingService.getShippingSubdivisions(chktCntryData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET SHIPPING OPTIONS
// PUBLIC
export const getShippingOptions = createAsyncThunk(
  'shipping/get-shipping-options',
  async (id, data, thunkAPI) => {
    try {
      return await shippingService.getShippingOptions(id, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShippingCountries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShippingCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shippingCountries = action.payload;
        // console.log(action.payload);
      })
      .addCase(getShippingCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getShippingSubdivisions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShippingSubdivisions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shippingSubdivisions = action.payload;
        // console.log(action.payload);
      })
      .addCase(getShippingSubdivisions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getShippingOptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShippingOptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shipping = action.payload;
        // console.log(action.payload);
      })
      .addCase(getShippingOptions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = shippingSlice.actions;
export default shippingSlice.reducer;
