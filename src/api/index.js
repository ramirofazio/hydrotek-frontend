import { apiHydro } from "./baseApi";

const route = {
  PRODUCTS: "products",
  USERS: "users",
  POSTS: "posts",
};

export const APIHydro = {
  getProducts: () => {
    return apiHydro.get(`/${route.PRODUCTS}/all`); //ejemplo para traer todos los productos
  },
  getProductDetail: (id) => {
    return apiHydro.get(`${route.PRODUCTS}/${id}`);
  },
};
