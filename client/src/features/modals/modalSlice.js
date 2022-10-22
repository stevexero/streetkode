import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthModalOpen: false,
  isCartModalOpen: false,
  isOnLogin: true,
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  cartModalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openAuthModal: (state) => {
      state.isAuthModalOpen = true;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    switchToSignUp: (state) => {
      state.isOnLogin = false;
    },
    switchToLogin: (state) => {
      state.isOnLogin = true;
    },
    openCartModal: (state) => {
      state.isCartModalOpen = true;
    },
    closeCartModal: (state) => {
      state.isCartModalOpen = false;
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  switchToSignUp,
  switchToLogin,
  openCartModal,
  closeCartModal,
} = modalSlice.actions;
export default modalSlice.reducer;
