import { apiHydro } from "./baseApi";

const route = {
  PRODUCT: "product",
  AUTH: "auth",
  USER: "user",
  CART: "shoppingCart",
  BLOG: "blog",
  CLOUDINARY: "cloudinary",
  CHECKOUT: "mobbex",
  TFACTURA: "tFactura",
  APIDOLAR: "apidolar",
};

// * Para una clara visualizacion de las rutas abrir
// * ---> "http://localhost:3000/docu"

export const APIHydro = {
  toggleActiveProduct: (id) => {
    return apiHydro.patch(`${route.PRODUCT}/toggle-active?id=${id}`);
  },
  markOrderAsPay: (fresaId) => {
    return apiHydro.patch(`${route.USER}/mark-order-as-pay?fresaId=${fresaId}`);
  },
  getAllOrders: () => {
    return apiHydro.get(`${route.USER}/get-all-orders`);
  },
  getOneOrder: (id) => {
    return apiHydro.get(`${route.USER}/get-one-order?id=${id}`);
  },
  getUserOrders: (id) => {
    return apiHydro.get(`${route.USER}/orders?id=${id}`);
  },
  createOrder: (data) => {
    return apiHydro.post(`${route.CART}/create-new-order`, data);
  },
  saveDeliveryInfo: (data) => {
    return apiHydro.patch(`${route.USER}/save-deliveryInfo`, data);
  },
  guestCheckout: (data) => {
    return apiHydro.post(`${route.CHECKOUT}/guest`, data);
  },
  userWithoutDniCheckout: (data) => {
    return apiHydro.post(`${route.CHECKOUT}/update-dni`, data);
  },
  userWithDniCheckout: (data) => {
    return apiHydro.post(`${route.CHECKOUT}`, data);
  },
  getFeaturedProducts: () => {
    return apiHydro.get(`${route.PRODUCT}/featured-products`);
  },
  addFeaturedProduct: (id) => {
    return apiHydro.put(`${route.PRODUCT}/toggle-featured-product?id=${id}`);
  },
  activeUser: (data) => {
    return apiHydro.put(`${route.AUTH}/active-user`, data);
  },
  resetPassword: (data) => {
    return apiHydro.post(`${route.AUTH}/reset-password`, data);
  },
  initResetPassword: (email) => {
    return apiHydro.post(`${route.AUTH}/init-reset`, { email });
  },
  manualTFacturaProductsUpdate: () => {
    return apiHydro.get(`${route.PRODUCT}/updateDB`).then((res) => {
      if (res.status === 200) {
        return APIHydro.getAllProducts();
      }
    });
  },
  manualUsdUpdate: () => {
    return apiHydro.post(`${route.APIDOLAR}/manual`).then((res) => {
      if (res.status === 201) {
        return APIHydro.getLastUsdPrice();
      }
    });
  },
  getLastUsdPrice: () => {
    return apiHydro.get(`${route.APIDOLAR}/full-last`);
  },
  alternAdmin: (id, currentUser) => {
    return apiHydro.put(`${route.USER}/alternAdmin`, { id: id, currenUser: currentUser }).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    });
  },
  getAllUsers: () => {
    return apiHydro.get(`/${route.USER}`);
  },
  getAllProducts: () => {
    return apiHydro.get(`/${route.PRODUCT}/all`);
  },
  getProductsPaginated: ({ pag, productsPerPage }) => {
    return apiHydro.post(`/${route.PRODUCT}/pag`, { pag, productsPerPage }); //ejemplo para traer todos los productos
  },
  getProducts: () => {
    return apiHydro.get(`/${route.PRODUCT}`); //ejemplo para traer todos los productos
  },
  getProductDetail: (id) => {
    return apiHydro.get(`${route.PRODUCT}/detail/${id}`);
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
  signUp: (data) => {
    return apiHydro.post(`/${route.AUTH}/signUp`, data);
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
  getPosts: () => {
    return apiHydro.get(`/${route.BLOG}`);
  },
  getPostDetail: (id) => {
    return apiHydro.get(`/${route.BLOG}/${id}`);
  },
  createPost: (userId, postData) => {
    return apiHydro.post(`/${route.BLOG}/`, { userId, postData });
  },
  editPost: (userId, postId, newPost) => {
    return apiHydro.put(`/${route.BLOG}/`, { userId, postId, newPost });
  },
  deletePost: (userId, postId) => {
    return apiHydro.delete(`/${route.BLOG}/`, { userId, postId });
  },
  uploadComment: ({ userId, postId, comment }) => {
    return apiHydro.post(`/${route.BLOG}/comment`, { userId, postId, comment });
  },
  updatePassword: ({ id, actualPassword, newPassword, newConfirmPassword }) => {
    return apiHydro.put(`/${route.USER}/updatePassword`, { id, actualPassword, newPassword, newConfirmPassword });
  },
  getSignature: () => {
    return apiHydro.get(`/${route.CLOUDINARY}/signature`);
  },
  updateAvatar: (file) => {
    return apiHydro.post(`/${route.CLOUDINARY}/updateAvatar`, file);
  },
  updateSavedPosts: ({ userId, postIds }) => {
    return apiHydro.post(`/${route.BLOG}/savePost`, { userId, postIds });
  },
  getSavedPosts: (userId) => {
    return apiHydro.get(`/${route.USER}/savedPosts/${userId}`);
  },
  addProductImg: ({ productId, path, assetId, publicId, index }) => {
    //eslint-disable
    return apiHydro.put(`/${route.PRODUCT}/img/add`, { productId, path, assetId, publicId, index });
    //eslint-enable
  },
  deleteAllProductImg: (productId) => {
    return apiHydro.delete(`/${route.CLOUDINARY}/img/deleteAll/${productId}`);
  },
  deleteProductImg: ({ productImgId, publicId }) => {
    return apiHydro.post(`/${route.CLOUDINARY}/img/deleteOne`, { productImgId, publicId });
  },
  updateCategory: (productId, categoryId) => {
    return apiHydro.put(`/${route.PRODUCT}/updateCategoty`, { productId, categoryId });
  }
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
