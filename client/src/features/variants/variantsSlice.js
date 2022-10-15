import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  variantGroups: [],
  variantOptions: [],
};

export const variantsSlice = createSlice({
  name: 'variants',
  initialState,
  reducers: {
    setVariantGroups: (state, action) => {
      state.variantGroups = [...state.variantGroups, action.payload];
    },
    setVariantOptions: (state, action) => {
      state.variantOptions = [...state.variantOptions, action.payload];
    },
  },
});

export const { setVariantGroups, setVariantOptions } = variantsSlice.actions;
export default variantsSlice.reducer;
