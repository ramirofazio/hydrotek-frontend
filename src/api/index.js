import { apiHydro } from "./baseApi";

const route = {
  PRODUCT: "product",
  AUTH: "auth",
  USER: "user",
  CART: "shoppingCart",
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
  getUsers: () => {
    return apiHydro.get(`/${route.USER}`);
  },
  signIn: ({ email, password }) => {
    return apiHydro.post(`/${route.AUTH}/signIn`, { email: email, pass: password });
  },
  loginByJWT: ({ accessToken }) => {
    return apiHydro.post(`/${route.AUTH}/jwtAutoLogin`, { accessToken });
  },
  signUp: ({ email, name, password, dni, roleId }) => {
    return apiHydro.post(`/${route.AUTH}/signUp`, { email: email, name: name, dni: dni, password: password, roleId: roleId });
  },
  googleAuthCode: (code) => {
    return apiHydro.post(`/${route.AUTH}/googleAuthCode`, { code });
  },
  updateShoppingCart: ({ userId, shoppingCart }) => {
    return apiHydro.put(`/${route.CART}`, { userId, shoppingCart });
  },
  resetShoppingCart: ({ userId }) => {
    return apiHydro.delete(`/${route.CART}/${userId}`);
  },
  updateUser: ({ profile, session }) => {
    return apiHydro.put(`/${route.USER}`, { profile, session });
  },
};

export function addAuthWithToken(token) {
  apiHydro.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}
