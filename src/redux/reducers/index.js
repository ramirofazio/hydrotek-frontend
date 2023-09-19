export { appRdr } from "./app.js";
export { userRdr } from "./user.js";
export { shoppingCartRdr } from "./shoppingCart.js";

import { loadProducts } from "./app.js";
export const actionsApp = {
  loadProducts,
};

import { saveSignInData } from "./user.js";
export const actionsUser = {
  saveSignInData,
};

import { saveSingInShoppingCart, loadStorageShoppingCart, addProudct, removeProduct } from "./shoppingCart.js";
export const actionsShoppingCart = {
  saveSingInShoppingCart,
  loadStorageShoppingCart,
  addProudct,
  removeProduct,
};
