import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  view: 'login',
};

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    changeView: (state, action) => {
      state.view = action.payload;
    },
  },
});

export const { changeView } = authModalSlice.actions;

export const selectAuthModal = (state) => state.authModal;

export default authModalSlice.reducer;