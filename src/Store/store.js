import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './auth';
import ProductSlice from './product';
import BookSlice from './book';

const Store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    product:ProductSlice.reducer,
    book:BookSlice.reducer
  }
});

export default Store;
