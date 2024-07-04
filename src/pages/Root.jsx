import { Outlet, useLoaderData } from "react-router-dom";
import { Footer, Navbar } from "src/components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveInStorage } from "src/utils/localStorage";
import { APIHydro } from "src/api";
import { actionsShoppingCart, actionsUser } from "src/redux/reducers";
import StickyCursor from "src/components/StickyCursor";
import { useDebouncedCallback } from "use-debounce";

export default function Root() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const { userInfo } = useLoaderData();

  const handleCart = useDebouncedCallback(() => {
    if (userInfo && userInfo.accessToken) {
      //? Si esta logueado
      const arrProducts = Object.values(shoppingCart.products);
      const cleanProducts = arrProducts.map((p) => {
        const res = { quantity: p.quantity, productId: p.productId };
        return res;
      });

      if (cleanProducts.length) {
        return APIHydro.updateShoppingCart({
          //! Se le esta mandanod el producto con toda la info y el BE lo espera de otra forma para el shopping cart.
          userId: userInfo.session.id,
          shoppingCart: { totalPrice: shoppingCart.totalPrice, products: cleanProducts },
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
    //? Para no duplicar tantos pedidos. Se ejecuta cuando el user deja de interactuar en 800ms ;)
  }, [800]);

  useEffect(() => {
    //? Se guarda el carrito en DB o localStorage cada vez que se actualiza el shopping cart
    handleCart();
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
      <div id="circuit" className="absolute -z-10 h-full w-full bg-circuit bg-center bg-repeat" />
      <StickyCursor />
      <Navbar />
      <Outlet />
      <Footer userInfo={userInfo} />
    </div>
  );
}
