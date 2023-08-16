import { createSlice } from "@reduxjs/toolkit";

const app = createSlice({
  name: "app",
  initialState: {
    products: [],
    totalPrice: 0,
  },
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const appRdr = app.reducer;
export const { loadProducts } = app.actions;