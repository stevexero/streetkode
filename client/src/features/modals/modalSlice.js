import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthModalOpen: false,
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  isAddCategoryModalOpen: false,
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
  },
});

export const { openAuthModal, closeAuthModal } = modalSlice.actions;
export default modalSlice.reducer;
