import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import checkoutService from './checkoutService';

const initialState = {
  checkout: {},
  checkoutInfo: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// GENERATE TOKEN
// PUBLIC
export const generateToken = createAsyncThunk(
  'checkout/generate-token',
  async (id, thunkAPI) => {
    try {
      return await checkoutService.generateToken(id);
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

// CAPTURE CHECKOUT
// PUBLIC
export const captureCheckout = createAsyncThunk(
  'checkout/capture-checkout',
  async (orderData, thunkAPI) => {
    try {
      return await checkoutService.captureCheckout(orderData);
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

export const checkoutSlice = createSlice({
  name: 'checkout',
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
      .addCase(generateToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.checkout = action.payload;
        console.log(action.payload);
      })
      .addCase(generateToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(captureCheckout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(captureCheckout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.checkoutInfo = action.payload;
        console.log(action.payload);
      })
      .addCase(captureCheckout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      });
  },
});

export const { reset } = checkoutSlice.actions;
export default checkoutSlice.reducer;
