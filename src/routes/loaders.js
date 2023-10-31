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
  /* const products = await APIHydro.getProducts();
  return products.data; */
}

export async function productDetailLoader({ params }) {
  const product = await APIHydro.getProductDetail(params.id);
  return product.data;
}
