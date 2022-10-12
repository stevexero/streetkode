import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import shopService from './shopService';

const initialState = {
  shop: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// REGISTER SHOP
export const registerShop = createAsyncThunk(
  'shop/register',
  async (shopData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await shopService.registerShop(shopData, token);
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

// export const sendWelcomeMail = createAsyncThunk(
//   'auth/sendWelcomeMail',
//   async (userData, thunkAPI) => {
//     try {
//       return await authService.sendWelcomeMail(userData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// GET SHOP
export const getShop = createAsyncThunk('shop/getShop', async (_, thunkAPI) => {
  console.log('get shop from slice');
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await shopService.getShop(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    resetShop: (state) => {
      state.shop = {};
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shop = action.payload;
        console.log(action.payload);
      })
      .addCase(registerShop.rejected, (state, action) => {
        state.isLoading = false;
        state.shop = null;
        state.isError = true;
        state.message = action.payload;
      })
      //   .addCase(sendWelcomeMail.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(sendWelcomeMail.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.isSuccess = true;
      //     console.log(action.payload);
      //   })
      //   .addCase(sendWelcomeMail.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.user = null;
      //     state.isError = true;
      //     state.message = action.payload;
      //   })
      .addCase(getShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shop = action.payload;
      })
      .addCase(getShop.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetShop } = shopSlice.actions;
export default shopSlice.reducer;
