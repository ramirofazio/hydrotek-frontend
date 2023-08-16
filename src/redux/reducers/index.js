import { setTotalPrice, setProducts } from "./shoppingCart.js";
import { loadProducts } from "./app.js";

export const actionsApp = {
  loadProducts,
};

export const actionsShoppingCart = {
  setTotalPrice,
  setProducts,
};

export { appRdr } from "./app.js";
export { shoppingCartRdr } from "./shoppingCart.js";
