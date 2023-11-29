export { appRdr } from "./app.js";
export { userRdr } from "./user.js";
export { shoppingCartRdr } from "./shoppingCart.js";
export { authRdr } from "./auth.js";

import { loadProducts } from "./app.js";
export const actionsApp = {
  loadProducts,
};

import { saveSignData, updateDataFromProfile, updateSavedPosts } from "./user.js";
export const actionsUser = {
  saveSignData,
  updateDataFromProfile,
  updateSavedPosts,
};

import {
  saveSingInShoppingCart,
  loadStorageShoppingCart,
  addProudct,
  removeProduct,
  emptyCart,
} from "./shoppingCart.js";
export const actionsShoppingCart = {
  saveSingInShoppingCart,
  loadStorageShoppingCart,
  addProudct,
  removeProduct,
  emptyCart,
};

import { setToken } from "./auth.js";
export const actionsAuth = {
  setToken,
};
