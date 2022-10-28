import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  company: '',
  address: '',
  address2: '',
  city: '',
  zipCode: '',
};

export const customerInputSlice = createSlice({
  name: 'customerInputs',
  initialState,
  reducers: {
    setCustomerEmail: (state, action) => {
      state.email = action.payload;
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
    setCustomerZipCode: (state, action) => {
      state.zipCode = action.payload;
    },
  },
});

export const {
  setCustomerEmail,
  setCustomerFirstName,
  setCustomerLastName,
  setCustomerAddress,
  setCustomerAddress2,
  setCustomerCity,
  setCustomerZipCode,
} = customerInputSlice.actions;
export default customerInputSlice.reducer;
