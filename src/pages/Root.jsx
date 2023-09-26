import { Outlet } from "react-router-dom";
import { Footer, Aurora, Navbar } from "src/components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveInStorage } from "src/utils/localStorage";
import { APIHydro } from "src/api";
import { actionsShoppingCart } from "src/redux/reducers";

export default function Root() {
  const dispatch = useDispatch();
  const { shoppingCart, user } = useSelector((state) => state);

  function handleCart() {
    // * aca se puede utilizarel event
    if (user.session.role) {
      const arrProducts = Object.values(shoppingCart.products);
      console.log(arrProducts);
      if (arrProducts.length) {
        APIHydro.updateShoppingCart({
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
  }, [shoppingCart, user]);

  useEffect(() => {
    if (!user.session.role) {
      dispatch(actionsShoppingCart.loadStorageShoppingCart()); // * el problema es un loop infinito al estar escuchando al estado de redux shoppingCart y modificarlo
    }
  }, []);

  return (
    <div className="relative overflow-hidden">
      <Aurora />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
