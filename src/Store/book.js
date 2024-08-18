import { createSlice } from "@reduxjs/toolkit";

const initialBookState = {
  Book: {},
};

const BookSlice = createSlice({
  name: 'Admin',
  initialState: initialBookState,
  reducers: {
    setBook(state, action) {
      state.Book = action.payload;
    },
    confirmBooking(state, action) {
      const { bookingId, status } = action.payload;
      if (state.Book[bookingId]) {
        state.Book[bookingId].Status = status;
      }
    },
  }
});

export const BookActions = BookSlice.actions;
export default BookSlice;
