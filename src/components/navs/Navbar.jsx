import Atropos from "atropos/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ModalNav, Categories } from "./";
import { links } from "src/utils";
import { logos } from "assets";
import { useSelector } from "react-redux";
import { WorkInProgressModal } from "../modals";
import { IconButtonWithBgGold } from "../buttons";
import { useState } from "react";

export const Navbar = ({ role }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { session } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex w-full items-center justify-between p-8 2xl:px-24">
      <NavLink to="/">
        <Atropos innerClassName="rounded-full" shadow={false}>
          <img src={logos.hydBlack} className="w-16 transition hover:opacity-70 xl:w-24" />
        </Atropos>
      </NavLink>
      <ModalNav role={role} pathname={pathname} />
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
        <i
          className={`ri-user-3-fill text-3xl ${pathname === "/user/profile" ? "text-gold/50" : "icons text-gold"}`} // Avatar
          onClick={() => setIsOpen(true)}
          /* onClick={() => navigate(role ? `/user/profile/${session.id}` : "/session/signIn")} */
        />
        <i onClick={() => navigate("/shoppingCart")} className="icons ri-shopping-cart-2-fill text-3xl  text-gold" />
      </section>
      <WorkInProgressModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        text={
          <p className="text-center text-sm">
            Pronto se habilitara el inicio de sesión
            <br />
            <a
              href={`http://wa.me/5491170823697?text=Hola%21%20Vengo%20de%20la%20web.%20Me%20interes%C3%B3%20el%20producto%20${name}`}
            >
              <strong>comunicate con nosotros</strong>
              <IconButtonWithBgGold icon={`ri-whatsapp-line`} className={"mx-auto -mb-10 mt-4"} />
            </a>
          </p>
        }
      />
    </nav>
  );
};
