import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from './cartService';

// Get cart from local localStorage
const cart = JSON.parse(localStorage.getItem('streetkodecart'));

const initialState = {
  cart: cart ? cart : {},
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

// GET CART
// PUBLIC
export const getCart = createAsyncThunk(
  'cart/get-cart',
  async (cartId, thunkAPI) => {
    try {
      return await cartService.getCart(cartId);
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

// ADD TO CART
// PUBLIC
export const addToCart = createAsyncThunk(
  'cart/add-to-cart',
  async (cartData, thunkAPI) => {
    try {
      return await cartService.addToCart(cartData);
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

// DELETE ITEM FROM CART
// PUBLIC
export const deleteItemFromCart = createAsyncThunk(
  'cart/delete-item-from-cart',
  async (cartItemData, thunkAPI) => {
    try {
      return await cartService.deleteItemFromCart(cartItemData);
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

// DECREMENT ITEM QUANTITY FROM CART
// PUBLIC
export const decrementItem = createAsyncThunk(
  'cart/decrement-item',
  async (cartItemData, thunkAPI) => {
    try {
      return await cartService.decrementItem(cartItemData);
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

// INCREMENT ITEM QUANTITY FROM CART
// PUBLIC
export const incrementItem = createAsyncThunk(
  'cart/increment-item',
  async (cartItemData, thunkAPI) => {
    try {
      return await cartService.incrementItem(cartItemData);
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
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        console.log(action.payload);
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        console.log(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteItemFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(decrementItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decrementItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(decrementItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(incrementItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(incrementItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(incrementItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
