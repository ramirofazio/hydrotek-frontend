import { apiHydro } from "./baseApi";

const route = {
  PRODUCT: "product",
  AUTH: "auth",
  USER: "user",
  CART: "shoppingCart",
  BLOG: "blog",
  CLOUDINARY: "cloudinary",
  CHECKOUT: "checkout"
};

// * Para una clara visualizacion de las rutas abrir
// * ---> "http://localhost:3000/docu"

export const APIHydro = {
  updateTFacturaProducts: () => {
    return apiHydro.get(`/${route.TFACTURA}/token`).then((res) => {
      if (res.status === 200) {
        return apiHydro.get(`/${route.TFACTURA}/products`).then((res) => {
          if (res.status === 200) {
            return apiHydro.get(`${route.PRODUCT}/updateDB`).then((res) => {
              if (res.status === 200) {
                return "success";
              }
            });
          }
        });
      }
    });
  },
  getProductsPaginated: ({ pag, productsPerPage }) => {
    console.log(pag, productsPerPage);
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
  getCheckout: () => {
    return apiHydro.get(`/${route.CHECKOUT}`);
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
