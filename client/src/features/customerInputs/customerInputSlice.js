import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFirstLoad: true,
  email: '',
  countryName: '',
  countryCode: '',
  firstName: '',
  lastName: '',
  company: '',
  address: '',
  address2: '',
  city: '',
  subdivision: '',
  zipCode: '',
};

export const customerInputSlice = createSlice({
  name: 'customerInputs',
  initialState,
  reducers: {
    setIsFirstLoad: (state, action) => {
      state.isFirstLoad = action.payload;
    },
    setCustomerEmail: (state, action) => {
      state.email = action.payload;
    },
    setCustomerCountryName: (state, action) => {
      state.countryName = action.payload;
    },
    setCustomerCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    setCustomerFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setCustomerLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setCustomerAddress: (state, action) => {
      state.address = action.payload;
    },
    setCustomerAddress2: (state, action) => {
      state.address2 = action.payload;
    },
    setCustomerCity: (state, action) => {
      state.city = action.payload;
    },
    setCustomerSubdivision: (state, action) => {
      state.subdivision = action.payload;
    },
    setCustomerZipCode: (state, action) => {
      state.zipCode = action.payload;
    },
  },
});

export const {
  setIsFirstLoad,
  setCustomerEmail,
  setCustomerCountryName,
  setCustomerCountryCode,
  setCustomerFirstName,
  setCustomerLastName,
  setCustomerAddress,
  setCustomerAddress2,
  setCustomerCity,
  setCustomerSubdivision,
  setCustomerZipCode,
} = customerInputSlice.actions;
export default customerInputSlice.reducer;
