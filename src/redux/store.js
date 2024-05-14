import { configureStore } from '@reduxjs/toolkit';
import authModalReducer from './slices/authModalSlice'; // Import the reducer correctly

const store = configureStore({
  reducer: {
    authModal: authModalReducer,
  },
});

export default store;