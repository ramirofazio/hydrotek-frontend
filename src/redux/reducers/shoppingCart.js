import { createSlice } from "@reduxjs/toolkit";
import { getOfStorage } from "src/utils/localStorage";

const shoppingCart = createSlice({
  name: "shoppingCart",
  initialState: {
    products: {},
    totalPrice: 0,
  },
  reducers: {
    saveSingInShoppingCart: (state, action) => {
      const { totalPrice, products } = action.payload;

      const productsDictionary = {};
      products.forEach((p) => {
        productsDictionary[p.productId] = { quantity: p.quantity, productId: p.productId };
      });

      state.totalPrice = totalPrice;
      state.products = productsDictionary;
    },
    loadStorageShoppingCart: (state, action) => {
      console.log(action);
      const shoppingCart = getOfStorage("shoppingCart");
      if (shoppingCart?.totalPrice > 0) {
        const { totalPrice, products } = shoppingCart;
        state.totalPrice = totalPrice;
        state.products = products;
      }
    },
    addProudct: (state, action) => {
      const { productId, price } = action.payload;
      const isAlready = state.products[productId]?.quantity;
      if (isAlready) {
        state.products[productId].quantity = isAlready + 1;
      } else {
        state.products[productId] = { quantity: 1, price: price, productId: 1 }; //TODO cambiar a id real del producto
      }
      state.totalPrice = parseInt(state.totalPrice) + price;
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
export const { saveSingInShoppingCart, loadStorageShoppingCart, addProudct, removeProduct } = shoppingCart.actions;
