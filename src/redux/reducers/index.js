export { appRdr } from "./app.js";
export { userRdr } from "./user.js";
export { shoppingCartRdr } from "./shoppingCart.js";

import { loadProducts } from "./app.js";
export const actionsApp = {
  loadProducts,
};

import { saveSignData } from "./user.js";
export const actionsUser = {
  saveSignData,
};

import { setTotalPrice, setProducts } from "./shoppingCart.js";
export const actionsShoppingCart = {
  setTotalPrice,
  setProducts,
};
