import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
};

export const customerInputSlice = createSlice({
  name: 'customerInputs',
  initialState,
  reducers: {},
});

export const {} = customerInputSlice.actions;
export default customerInputSlice.reducer;
