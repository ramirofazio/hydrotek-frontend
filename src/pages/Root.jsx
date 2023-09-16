import { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { saveInStorage } from "src/utils/localStorage";
import { Outlet } from "react-router-dom";
import { Footer, Aurora, Navbar } from "src/components";
import { APIHydro } from "src/api";

export default function Root() {
  const { shoppingCart, user } = useSelector((state) => state);

  useEffect(() => {
    console.log(shoppingCart);
    console.log(shoppingCart.totalPrice);

    function handleCart(e) {
      if (shoppingCart.totalPrice) {
        console.log("presio", shoppingCart.totalPrice);
        if (user.session.role) {
          // * si tiene un rol, significa que esta logueado
          console.log("logueadox");
          console.log(shoppingCart); // load cart in DB
        } else {
          saveInStorage("shoppingCart", shoppingCart);
        }
      }
    }
    window.addEventListener("beforeunload", handleCart);
  }, [shoppingCart]);

  return (
    <div className="relative overflow-hidden">
      <Aurora />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
