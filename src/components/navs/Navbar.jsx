import Atropos from "atropos/react";
import { NavLink, useNavigate } from "react-router-dom";
import { ModalNav, Categories } from "./";
import { links } from "src/utils";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { logos } from "assets";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex w-full items-center justify-between p-8 2xl:px-24">
      <NavLink to="/">
        <Atropos innerClassName="rounded-full" shadow={false}>
          <img src={logos.hydBlack} className="w-14 transition hover:opacity-70 xl:w-20" />
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
      <section className="hidden  justify-evenly gap-9 lg:flex">
        <UserIcon className="h-10 w-10  text-gold" onClick={() => navigate("/signIn")} />
        <ShoppingCartIcon className="h-10 w-10  text-gold" />
      </section>
    </nav>
  );
};
