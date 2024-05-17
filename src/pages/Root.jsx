import { Outlet, useLoaderData } from "react-router-dom";
import { Footer, Aurora, Navbar } from "src/components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveInStorage } from "src/utils/localStorage";
import { APIHydro } from "src/api";
import { actionsShoppingCart, actionsUser } from "src/redux/reducers";

export default function Root() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const { userInfo } = useLoaderData();

  function handleCart() {
    if (userInfo && userInfo.accessToken) {
      //? Si esta logueado

      let arrProducts = Object.values(shoppingCart.products);
      arrProducts = arrProducts.map((product) => {
        const mockProduct = { ...product };
        delete mockProduct["discountPrice"];
      });
      if (arrProducts.length) {
        return APIHydro.updateShoppingCart({
          //! Se le esta mandanod el producto con toda la info y el BE lo espera de otra forma para el shopping cart.
          userId: userInfo.session.id,
          shoppingCart: { totalPrice: shoppingCart.totalPrice, products: arrProducts },
        });
      } else {
        return APIHydro.resetShoppingCart({ userId: userInfo.session.id });
      }
    } else {
      //? Si no esta logueado
      const newProducts = {};
      for (const product in shoppingCart.products) {
        const rawProduct = shoppingCart.products[product];
        delete rawProduct["discountPrice"];
        newProducts[product] = rawProduct;
      }
      saveInStorage("shoppingCart", { ...shoppingCart, products: newProducts });
    }
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleCart);
    return () => {
      window.removeEventListener("beforeunload", handleCart);
    };
  }, [shoppingCart]);

  useEffect(() => {
    if (userInfo && userInfo.session) {
      //? Si esta logueado
      dispatch(actionsUser.saveSignData(userInfo));
      if (userInfo.shoppingCart) {
        dispatch(actionsShoppingCart.saveSingInShoppingCart(userInfo.shoppingCart));
      }
    }
  }, [userInfo && userInfo.session]);

  useEffect(() => {
    if (!userInfo) {
      //? Si no tiene cuenta
      dispatch(actionsShoppingCart.loadStorageShoppingCart());
    }
  }, [!userInfo]);

  return (
    <div className={`relative overflow-hidden`}>
      <Aurora />
      <Navbar />
      <Outlet />
      <Footer userInfo={userInfo} />
    </div>
  );
}
