import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from local localStorage
const user = JSON.parse(localStorage.getItem('streetkodeuser'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// REGISTER
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

// LOGIN
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// LOGOUT
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// GET CURRENT USER
export const getMe = createAsyncThunk('auth/getme', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await authService.getMe(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// export const upgradeUser = createAsyncThunk(
//   'auth/upgrade',
//   async (userData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await authService.upgradeUser(userData, token);
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

export const authSlice = createSlice({
  name: 'auth',
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
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
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      //   .addCase(upgradeUser.pending, (state) => {
      //     state.isLoading = true;
      //   })
      //   .addCase(upgradeUser.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.isSuccess = true;
      //   })
      //   .addCase(upgradeUser.rejected, (state, action) => {
      //     state.isLoading = false;
      //     state.user = null;
      //     state.isError = true;
      //     state.message = action.payload;
      //   })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
