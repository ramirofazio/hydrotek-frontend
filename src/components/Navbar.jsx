import { NavLink } from "react-router-dom";
import logo from "../assets/blackLogo.png";
import userProfile from "../assets/userProfile.png";
import shoppingCart from "../assets/shoppingCart.png";
import arrowDown from "../assets/arrowDown.png";

const links = [
  { name: "Productos", path: "/products" },
  { name: "Categorias", path: "/products/category" },
  { name: "Blog", path: "/blog" },
  { name: "Sobre Nosotros", path: "/aboutUs" },
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
              {l.name === "Categorias" && <img src={arrowDown} className="ml-2 h-1" />}
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
