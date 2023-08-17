import { Popover, Transition } from "@headlessui/react";
import userProfile from "../assets/userProfile.png";
import shoppingCart from "../assets/shoppingCart.png";
import { links } from "./Navbar.jsx";
import { NavLink, Link } from "react-router-dom";
import {Bars3BottomRightIcon, XMarkIcon} from "@heroicons/react/24/outline";

export function ModalNav() {
  return (
    <Popover className="relative">
      <Popover.Button>
        <Bars3BottomRightIcon className="h-6 w-6" aria-hidden="true"/>
      </Popover.Button>
      <Popover.Panel className="border-2 bg-black py-5 px-3">
        <Popover.Button>
          <XMarkIcon className="h-5 w-6"/>
        </Popover.Button>
        <nav className="text-white">
          {links.map((l, i) => (
            <ul key={i}>
              <NavLink to={l.path}>{l.name}</NavLink>
            </ul>
          ))}
          <section>
            <Link>
              <img src={userProfile} className="h-5" />
            </Link>
            <Link>
              <img src={shoppingCart} className="h-5" />
            </Link>
          </section>
        </nav>
      </Popover.Panel>
    </Popover>
  );
}
