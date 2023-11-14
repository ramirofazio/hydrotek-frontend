import { Outlet, useLoaderData } from "react-router-dom";
import { Footer, Aurora, Navbar } from "src/components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveInStorage } from "src/utils/localStorage";
import { APIHydro } from "src/api";
import { actionsShoppingCart, actionsUser } from "src/redux/reducers";

export default function Root() {
  const dispatch = useDispatch();
  const { shoppingCart, user } = useSelector((state) => state);
  const userInfo = useLoaderData();

  function handleCart() {
    // * aca se puede utilizar el event
    if (user.session.role) {
      const arrProducts = Object.values(shoppingCart.products);
      if (arrProducts.length) {
        return APIHydro.updateShoppingCart({
          userId: user.session.id,
          shoppingCart: { totalPrice: shoppingCart.totalPrice, products: arrProducts },
        });
      } else {
        return APIHydro.resetShoppingCart({ userId: user.session.id });
      }
    } else {
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
    if (userInfo?.userInfo && !user.session.role) {
      dispatch(actionsUser.saveSignData(userInfo?.userInfo));
      if (userInfo?.userInfo.shoppingCart && userInfo?.userInfo.shoppingCart.totalPrice) {
        dispatch(actionsShoppingCart.saveSingInShoppingCart(userInfo.userInfo.shoppingCart));
      }
    } else if (!user.session.role) {
      dispatch(actionsShoppingCart.loadStorageShoppingCart()); // * el problema es un loop infinito al estar escuchando al estado de redux shoppingCart y modificarlo
    }
  }, [user]);

  return (
    <div className={`relative overflow-hidden`}>
      <Aurora />
      <Navbar role={user.session.role} userId={user.session.id} shoppingCart={shoppingCart} />
      <Outlet />
      <Footer />
    </div>
  );
}
