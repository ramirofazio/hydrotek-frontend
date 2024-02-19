import { createSlice } from "@reduxjs/toolkit";
import { logos } from "src/assets";
import { getOfStorage } from "src/utils/localStorage";

const shoppingCart = createSlice({
  name: "shoppingCart",
  initialState: {
    products: {},
    totalPrice: 0,
    discount: 0,
    finalPrice: 0,
  },
  reducers: {
    applyDiscount: (state, action) => {
      const discountPercentaje = action.payload;
      const discount = (discountPercentaje / 100) * state.totalPrice;
      state.discount = action.payload;
      state.finalPrice = state.totalPrice - discount;
    },
    emptyCart: (state) => {
      state.products = {};
      state.totalPrice = 0;
    },
    saveSingInShoppingCart: (state, action) => {
      const { totalPrice, products } = action.payload;

      const productsDictionary = {};
      products.forEach((p) => {
        productsDictionary[p.productId] = {
          quantity: p.quantity,
          productId: p.productId,
          price: p.price,
          name: p.name,
          img: p.product?.images[0]?.path || logos.hydBlack,
        };
      });

      state.totalPrice = totalPrice;
      state.products = productsDictionary;
    },
    loadStorageShoppingCart: (state) => {
      const shoppingCart = getOfStorage("shoppingCart");
      if (shoppingCart?.totalPrice > 0) {
        const { totalPrice, products } = shoppingCart;
        state.totalPrice = totalPrice;
        state.products = products;
      }
    },
    addProudct: (state, action) => {
      const { productId, productName, price, productImg } = action.payload;
      const isAlready = state.products[productId]?.quantity;
      if (isAlready) {
        state.products[productId].quantity = isAlready + 1;
      } else {
        state.products[productId] = { quantity: 1, price: price, productId, name: productName, img: productImg };
      }
      state.totalPrice = parseInt(state.totalPrice) + parseInt(price);
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
export const { saveSingInShoppingCart, loadStorageShoppingCart, addProudct, removeProduct, emptyCart, applyDiscount } =
  shoppingCart.actions;
