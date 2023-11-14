import Atropos from "atropos/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ModalNav, Categories } from "./";
import { links } from "src/utils";
import { logos } from "assets";


export const Navbar = ({ role, userId, shoppingCart }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let cartQuantity = false;
  if (shoppingCart.totalPrice > 0) {
    cartQuantity = Object.values(shoppingCart.products).length;
    console.log(cartQuantity);
  }

  return (
    <nav className="flex w-full items-center justify-between p-8 2xl:px-24">
      <NavLink to="/">
        <Atropos innerClassName="rounded-full" shadow={false}>
          <img src={logos.hydBlack} className="w-16 transition hover:opacity-70 xl:w-24" />
        </Atropos>
      </NavLink>
      <ModalNav userId={userId} role={role} pathname={pathname} />
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
          className={`ri-user-3-fill text-4xl ${pathname === "/user/profile" ? "text-gold/50" : "icons text-gold"}`} // Avatar
          onClick={() => navigate(role ? `/user/profile/${userId}` : "/session/signIn")}
        />

        <div className="relative">
          <i onClick={() => navigate("/shoppingCart")} className=" icons ri-shopping-cart-2-fill text-4xl  text-gold" />
          {cartQuantity && <p className="rounded-full text-center font-bold h-[23px] w-[23px] border-[0.5px] bg-base text-sm text-white absolute -bottom-2  -right-1">{cartQuantity}</p>}
        </div>
      </section>
    </nav>
  );
};
