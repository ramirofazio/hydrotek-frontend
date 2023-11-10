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
      const { productId, productName, price } = action.payload;
      const isAlready = state.products[productName]?.quantity;
      if (isAlready) {
        state.products[productName].quantity = isAlready + 1;
      } else {
        state.products[productName] = { quantity: 1, price: price, productId, name: productName };
      }
      state.totalPrice = parseInt(state.totalPrice) + parseInt(price);
    },
    removeProduct: (state, action) => {
      const { productName, price } = action.payload;
      const productQuantity = state.products[productName]?.quantity;

      if (productQuantity === 1) {
        delete state.products[productName];
      } else {
        state.products[productName].quantity = productQuantity - 1;
      }
      state.totalPrice = state.totalPrice - price;
    },
  },
});

export const shoppingCartRdr = shoppingCart.reducer;
export const { saveSingInShoppingCart, loadStorageShoppingCart, addProudct, removeProduct } = shoppingCart.actions;
