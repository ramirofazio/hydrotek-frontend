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
  console.log(userInfo);


  function handleCart() {
    if (userInfo && userInfo.accessToken) {
      //? Si esta logueado
      const arrProducts = Object.values(shoppingCart.products);
      console.log("redux", shoppingCart.products);
      if (arrProducts.length) {
        return APIHydro.updateShoppingCart({
          userId: userInfo.session.id,
          shoppingCart: { totalPrice: shoppingCart.totalPrice, products: arrProducts },
        });
      } else {
        return APIHydro.resetShoppingCart({ userId: userInfo.session.id });
      }
    } else {
      //? Si no esta logueado
      saveInStorage("shoppingCart", shoppingCart);
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
      <Footer />
    </div>
  );
}
