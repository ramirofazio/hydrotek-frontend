import { NavLink } from "react-router-dom";
import logo from "../assets/blackLogo.png";
import userProfile from "../assets/userProfile.png";
import shoppingCart from "../assets/shoppingCart.png";
import arrowDown from "../assets/arrowDown.png";

const links = [
  { name: "PRODUCTOS", path: "/products" },
  { name: "CATEGORIAS", path: "/products/category" },
  { name: "BLOG", path: "/blog" },
  { name: "SOBRE NOSOTROS", path: "/aboutUs" },
];

export default function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between px-24 py-4">
      <NavLink to="/">
        <img src={logo} className="h-24 w-24 hover:animate-pulse" />
      </NavLink>
      <ul className="flex h-full">
        {links.map((l, index) => (
          <li key={index} className="mr-8 flex items-center justify-center">
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
              {l.name === "CATEGORIAS" && (
                <img src={arrowDown} className="ml-2 h-[5px]" />
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      <section className="flex w-24 justify-evenly">
        <img src={userProfile} className="h-5" />
        <img src={shoppingCart} className="h-5" />
      </section>
    </nav>
  );
}
