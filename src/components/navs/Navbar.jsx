import Atropos from "atropos/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ModalNav, Categories } from "./";
import { links } from "src/utils";
import { logos } from "assets";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const shoppingCart = useSelector((s) => s.shoppingCart);
  const { id, role } = useSelector((s) => s.user.session);

  /*
! Hay un bug en la actualizacion de redux user.session al hacer logout y se sigue mostrando el icono de dashboard si es admin.
! Si es user sigue haciendo redireccion al perfil cuando se apreta el icono de user, en admin tambien.
! tiene que ver con alguna logica de `ProtectedRoute.jsx` CREO. Se vuelve a guardar el user en redux

?   -R
*/

  const [cartQty, setCartQty] = useState(null);

  useEffect(() => {
    if (shoppingCart.totalPrice > 0) {
      setCartQty(Object.values(shoppingCart.products).length);
    }
  }, [shoppingCart.totalPrice]);

  return (
    <nav className="flex w-full items-center justify-between p-8 2xl:px-24">
      <NavLink to="/">
        <Atropos innerClassName="rounded-full" shadow={false}>
          <img src={logos.hydBlack} className="w-20 transition hover:opacity-70 xl:w-24" />
        </Atropos>
      </NavLink>
      <ModalNav userId={id} role={role} pathname={pathname} />
      <ul className="hidden h-full lg:flex">
        {links.map((l, index) => (
          <li key={index} className="mr-8 flex items-center justify-center">
            {l.name === "CATEGORIAS" ? (
              <Categories />
            ) : (
              <NavLink
                to={l.path}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "textGoldGradient"
                    : isPending
                    ? "pending"
                    : "flex items-center rounded-md border-b-2 border-transparent p-2 text-white"
                }
              >
                {l.name}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
      <section className="hidden  justify-evenly gap-9 lg:flex">
        {role === "ADMIN" && (
          <i
            onClick={() => window.open("/admin/dashboard", "_blank")}
            className="icons ri-bar-chart-2-fill text-3xl  text-gold"
          />
        )}
        <i
          className={`ri-user-3-fill text-3xl ${
            pathname.match("/user/profile/*") ? "text-gold/50" : "icons text-gold"
          }`}
          onClick={() => navigate(id ? `/user/profile/${id}` : "/session/signIn")}
        />

        <div className="relative">
          <i
            onClick={() => navigate("/shoppingCart")}
            className={`ri-shopping-cart-2-fill text-3xl ${
              pathname.match("/shoppingCart/*") ? "text-gold/50" : "icons text-gold"
            }`}
          />
          {cartQty && (
            <p className="absolute -bottom-2 -right-1 h-[23px] w-[23px] rounded-full border-[0.5px] bg-base text-center text-sm font-bold  text-white">
              {cartQty}
            </p>
          )}
        </div>
      </section>
    </nav>
  );
};
