import { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { saveInStorage } from "src/utils/localStorage";
import { Outlet } from "react-router-dom";
import { Footer, Aurora, Navbar } from "src/components";
import { APIHydro } from "src/api";

export default function Root() {
  const { shoppingCart, user } = useSelector((state) => state);
  const arr = Object.values(shoppingCart.products);
  console.log(arr);
  useEffect(() => {
    console.log(shoppingCart);
    console.log(shoppingCart.totalPrice);
    const arr = Object.values(shoppingCart.products);
    console.log(arr);
    function handleCart(e) {
      e.preventDefault();
      console.log("presio", shoppingCart.totalPrice);
      if (user.session.role) {
        // * si tiene un rol, significa que esta logueado
        const arrProducts = Object.values(shoppingCart.products);

        if (arrProducts.length) {
          return APIHydro.updateShoppingCart({
            userId: user.id,
            shoppingCart: { ...shoppingCart, products: arrProducts },
          });
        } else {
          return APIHydro.resetShoppingCart({ userId: user.id });
        }
      } else {
        saveInStorage("shoppingCart", shoppingCart);
      }
    }
    window.addEventListener("beforeunload", handleCart);
  }, [shoppingCart]);

  return (
    <div className="relative overflow-hidden">
      <Aurora />
      <button
        className="w-[10rem] bg-red-500"
        onClick={() =>
          APIHydro.updateShoppingCart({ userId: user.id, shoppingCart: { ...shoppingCart, products: arr } })
        }
      >
        Cargarrrs
      </button>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
