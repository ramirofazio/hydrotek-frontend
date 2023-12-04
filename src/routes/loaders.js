import { getOfStorage, deleteOfStorage, saveInStorage } from "src/utils/localStorage";
import { APIHydro } from "src/api";

export async function autoLoginLoader() {
  const token = getOfStorage("accessToken");
  if (token) {
    try {
      const userInfo = await APIHydro.loginByJWT({ accessToken: token });
      saveInStorage("accessToken", userInfo.data.accessToken);
      return { userInfo: userInfo.data };
    } catch (e) {
      deleteOfStorage("accessToken");
      return { error: e, message: e.message };
    }
  }
  return false;
}

export function notAuthLoader() {
  const token = getOfStorage("accessToken");
  return { accessToken: token };
}

export async function blogLoader() {
  const posts = await APIHydro.getPosts();
  return posts.data;
}

export async function productsLoader(pag) {
  const products = await APIHydro.getProductsPaginated({ pag: parseInt(pag), productsPerPage: 22 });
  return products.data;
}

export async function productDetailLoader({ params }) {
  const product = await APIHydro.getProductDetail(params.id);
  return product.data;
}

export async function allProductsLoader() {
  const products = await APIHydro.getAllProducts();
  return products.data;
}

export async function allUsersLoader() {
  const users = await APIHydro.getAllUsers();
  return users.data;
}

export async function getLastUsdPrice() {
  const lastUsdprice = await APIHydro.getLastUsdPrice();
  return lastUsdprice.data;
}

export async function featuredProductsLoader() {
  const products = (await APIHydro.getFeaturedProducts()).data;
  const cleanProducts = products.filter((p) => p.published === true);
  return cleanProducts;
}

export async function ordersLoader(userId) {
  return (await APIHydro.getUserOrders(userId)).data;
}

export async function oneOrderLoader(orderId) {
  return (await APIHydro.getOneOrder(orderId)).data;
}

export async function getAllOrders() {
  return (await APIHydro.getAllOrders()).data;
}
