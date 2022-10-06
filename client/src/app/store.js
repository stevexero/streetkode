import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import modalReducer from '../features/modals/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalReducer,
  },
});
