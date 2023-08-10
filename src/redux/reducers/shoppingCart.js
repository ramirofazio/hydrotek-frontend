import { createSlice } from "@reduxjs/toolkit";

const shoppingCart = createSlice({
  name: 'shoppingCart',
  initialState: {
    products: [],
    totalPrice: 0,
  },
  reducers: {
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload
    },
    setProducts: (state, action) => {
      state.products = action.payload
    }
  }
})

export const shoppingCartRdr = shoppingCart.reducer
export const {setTotalPrice, setProducts} = shoppingCart.actions