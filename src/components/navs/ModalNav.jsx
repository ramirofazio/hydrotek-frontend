import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import userProfile from "assets/userProfile.png";
import shoppingCart from "assets/shoppingCart.png";
import { links } from "src/utils";
import { NavLink, Link } from "react-router-dom";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Categories } from "./Categories.jsx";
import { SignIn } from "src/pages/session/index.js";

export function ModalNav() {
  const [loginShow, setLoginShow] = useState(true);

  const alternModal = () => {
    setLoginShow(!loginShow);
  };

  return (
    <Popover className="lg:hidden">
      <Popover.Button className="focus:outline-0">
        <Bars3BottomRightIcon className="h-10 w-10 text-gold " aria-hidden="true" />
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
        <Popover.Panel className="absolute right-0 top-0 z-50  flex min-w-fit max-w-[60%]  flex-col gap-6 rounded-sm border-2 border-black/40 bg-black px-4 py-11 text-xl shadow-2xl">
          <Popover.Button className="goldGradient mb-1 w-fit place-self-end justify-self-center rounded-sm px-[1px] hover:bg-opacity-70">
            <XMarkIcon className="goldGradient h-6 w-6 stroke-black stroke-[3.5px] hover:stroke-[3.8px]" />
          </Popover.Button>
          <nav className="my-1">
            <ul className="flex w-[95%] flex-col gap-6 pl-1 text-white">
              {links.map((l, i) =>
                l.name === "CATEGORIAS" ? (
                  <li key={i}>
                    <Categories />
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

            <section className="mt-10 flex justify-around">
              <Link>
                <img src={userProfile} className="h-7 w-7" onClick={alternModal} />
              </Link>
              <Link>
                <img src={shoppingCart} className="h-7 w-7" />
              </Link>
            </section>
          </nav>
        </Popover.Panel>
      </Transition>
      <SignIn isOpen={loginShow} alternModal={alternModal} />
    </Popover>
  );
}
