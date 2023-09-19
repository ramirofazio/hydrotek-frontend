import { createSlice } from "@reduxjs/toolkit";

const shoppingCart = createSlice({
  name: "shoppingCart",
  initialState: {
    products: {
      peluproduct: { quantity: 0, price: 0, productId: "producto1" },
    },
    totalPrice: 0,
  },
  reducers: {
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProudct: (state, action) => {
      const { productId, price } = action.payload;
      const isAlready = state.products[productId]?.quantity;
      if (isAlready) {
        state.products[productId].quantity = isAlready + 1;
      } else {
        state.products[productId] = { quantity: 1, price: price, productId: 1 };
      }
      state.totalPrice = state.totalPrice + price;
    },
    removeProduct: (state, action) => {
      const { productId, price } = action.payload;
      const productQuantity = state.products[productId]?.quantity;

      if (productQuantity === 1) {
        delete state.products[productId];
      } else {
        state.products[productId].quantity = productQuantity - 1;
      }
      state.totalPrice = state.totalPrice - price;
    },
  },
});

export const shoppingCartRdr = shoppingCart.reducer;
export const { setTotalPrice, setProducts, addProudct, removeProduct } = shoppingCart.actions;
