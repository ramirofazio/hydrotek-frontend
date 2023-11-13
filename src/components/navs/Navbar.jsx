import Atropos from "atropos/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ModalNav, Categories } from "./";
import { links } from "src/utils";
import { logos } from "assets";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { session } = useSelector((state) => state.user);

  return (
    <nav className="flex w-full items-center justify-between p-8 2xl:px-24">
      <NavLink to="/">
        <Atropos innerClassName="rounded-full" shadow={false}>
          <img src={logos.hydBlack} className="w-16 transition hover:opacity-70 xl:w-24" />
        </Atropos>
      </NavLink>
      <ModalNav role={session.role} pathname={pathname} />
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
        {session.role === "ADMIN" && (
          <i
            onClick={() => window.open("/admin/dashboard", "_blank")}
            className="icons ri-bar-chart-2-fill text-3xl  text-gold"
          />
        )}
        <i
          className={`ri-user-3-fill text-3xl ${
            pathname.match("/user/profile/*") ? "text-gold/50" : "icons text-gold"
          }`} // Avatar
          onClick={() => navigate(session.role ? `/user/profile/${session.id}` : "/session/signIn")}
        />
        <i onClick={() => navigate("/shoppingCart")} className="icons ri-shopping-cart-2-fill text-3xl  text-gold" />
      </section>
    </nav>
  );
};
