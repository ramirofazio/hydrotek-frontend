import { apiHydro } from "./baseApi";

const route = {
  PRODUCT: "product",
  AUTH: "auth",
  USER: "user",
};

// * Para una clara visualizacion de las rutas abrir
// * ---> "http://localhost:3000/docu"

export const APIHydro = {
  getProducts: () => {
    return apiHydro.get(`/${route.PRODUCT}/all`); //ejemplo para traer todos los productos
  },
  getProductDetail: (id) => {
    return apiHydro.get(`${route.PRODUCT}/${id}`);
  },
  signIn: (email, pass) => {
    return apiHydro.post(`/${route.AUTH}/signIn`, { email, pass });
  },
};
