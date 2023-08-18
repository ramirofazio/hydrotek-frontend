import { Popover } from "@headlessui/react";
import userProfile from "../assets/userProfile.png";
import shoppingCart from "../assets/shoppingCart.png";
import { links } from "./Navbar.jsx";
import { NavLink, Link } from "react-router-dom";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

export function ModalNav() {
  return (
    <Popover className="relative">
      <Popover.Button>
        <Bars3BottomRightIcon className="h-6 w-6" aria-hidden="true" />
      </Popover.Button>
      <Popover.Panel className="flex w-fit  flex-col gap-6 rounded-sm border-2 border-black/40 bg-black px-3 py-5 text-base shadow-2xl">
        <Popover.Button className="goldGradient mb-3 w-fit place-self-end justify-self-center rounded-sm px-[1px] hover:bg-opacity-70">
          <XMarkIcon className="goldGradient h-5 w-5 stroke-black stroke-[3.5px] hover:stroke-[3.8px]" />
        </Popover.Button>
        <nav className="flex flex-col gap-4 pl-1 text-white w-[95%]">
          {links.map((l, i) => (
            <ul key={i}>
              <NavLink
                to={l.path}
                className={({ isActive, isPending }) =>
                  isActive ? "border-b-[1px] " : isPending ? "" : ""
                }
              >
                {l.name}
              </NavLink>
            </ul>
          ))}
        </nav>
        <section className="flex justify-around">
          <Link>
            <img src={userProfile} className="h-5 w-5" />
          </Link>
          <Link>
            <img src={shoppingCart} className="h-5 w-5" />
          </Link>
        </section>
      </Popover.Panel>
    </Popover>
  );
}
