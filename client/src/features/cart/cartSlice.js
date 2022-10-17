import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from './cartService';

const initialState = {
  cart: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// CREATE CART
// PUBLIC
export const createCart = createAsyncThunk(
  'cart/create-cart',
  async (_, thunkAPI) => {
    try {
      return await cartService.createCart();
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

export const cartSlice = createSlice({
  name: 'cart',
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
      .addCase(createCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        console.log(action.payload);
      })
      .addCase(createCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
