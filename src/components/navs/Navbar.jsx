import { NavLink } from "react-router-dom";
import logo from "assets/blackLogo.png";
import userProfile from "assets/userProfile.png";
import shoppingCart from "assets/shoppingCart.png";
import { Categories } from "./Categories";
import Atropos from "atropos/react";
import { ModalNav } from "./ModalNav";
import { links } from "src/utils";

export const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between p-8 2xl:px-24">
      <NavLink to="/">
        <Atropos innerClassName="rounded-full" shadow={false}>
          <img src={logo} className="w-14 transition hover:opacity-70 xl:w-20" />
        </Atropos>
      </NavLink>
      <ModalNav />
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
                    ? "border-b-2 p-2  text-white"
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
      <section className="hidden w-24 justify-evenly xl:flex">
        <img src={userProfile} className="h-5" />
        <img src={shoppingCart} className="h-5" />
      </section>
    </nav>
  );
};
