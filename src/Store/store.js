import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './auth';
import ProductSlice from './product';
const Store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    product:ProductSlice.reducer
  }
});

export default Store;
