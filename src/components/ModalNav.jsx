import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import userProfile from "../assets/userProfile.png";
import shoppingCart from "../assets/shoppingCart.png";
import { links } from "./Navbar.jsx";
import { NavLink, Link } from "react-router-dom";
import { Bars3BottomRightIcon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export function ModalNav() {

  return (
    <Popover className="">
      <Popover.Button className="focus:outline-0">
        <Bars3BottomRightIcon className=" goldGradient h-6 w-6 " aria-hidden="true" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel className="fixed right-4  top-8 z-50 flex w-fit flex-col gap-6 rounded-sm border-2 border-black/40 bg-black px-3  py-5 text-base shadow-2xl">
          <Popover.Button className="goldGradient mb-3 w-fit place-self-end justify-self-center rounded-sm px-[1px] hover:bg-opacity-70">
            <XMarkIcon className="goldGradient h-5 w-5 stroke-black stroke-[3.5px] hover:stroke-[3.8px]" />
          </Popover.Button>
          <nav>
            <ul className="flex w-[95%] flex-col gap-4 pl-1 text-white">
              {links.map((l, i) =>
                l.name === "CATEGORIAS" ? (
                  <li key={i}>
                    <NavLink
                      to={l.path}
                      className={({ isActive, isPending }) => (isActive ? "border-b-[1px] " : isPending ? "" : "")}
                    >
                      <h2 className="inline">{l.name}</h2>
                      <ChevronDownIcon className="ml-1 inline h-4 w-4 text-gold" />
                    </NavLink>
                  </li>
                ) : (
                  <li key={i}>
                    <NavLink
                      to={l.path}
                      className={({ isActive, isPending }) => (isActive ? "border-b-[1px] " : isPending ? "" : "")}
                    >
                      {l.name}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            <section className="mt-6 flex justify-around">
              <Link>
                <img src={userProfile} className="h-5 w-5" />
              </Link>
              <Link>
                <img src={shoppingCart} className="h-5 w-5" />
              </Link>
            </section>
          </nav>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
