import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../features/modals/modalSlice';

export const store = configureStore({
  reducer: {
    modals: modalReducer,
  },
});
