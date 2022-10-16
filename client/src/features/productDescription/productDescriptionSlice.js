import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productDescriptionHTML: '',
};

export const productDescriptionSlice = createSlice({
  name: 'productDescription',
  initialState,
  reducers: {
    setProductDescription: (state, action) => {
      state.productDescriptionHTML = action.payload;
    },
  },
});

export const { setProductDescription } = productDescriptionSlice.actions;
export default productDescriptionSlice.reducer;
