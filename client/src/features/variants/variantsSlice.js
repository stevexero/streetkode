import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  variantOptions: [],
};

export const variantsSlice = createSlice({
  name: 'variants',
  initialState,
  reducers: {
    setVariantOptions: (state, action) => {
      state.variantOptions = [...state.variantOptions, action.payload];
    },
  },
});

export const { setVariantOptions } = variantsSlice.actions;
export default variantsSlice.reducer;
