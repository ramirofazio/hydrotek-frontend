import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { links } from "src/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { Categories } from "./Categories.jsx";

export function ModalNav({ token, pathname }) {
  const navigate = useNavigate();

  return (
    <Popover className="lg:hidden">
      <Popover.Button className="focus:outline-0">
        <i className="ri-menu-4-fill icons text-4xl text-gold"></i>
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
          <Popover.Button className="goldGradient mb-1 w-fit place-self-end justify-self-center rounded-sm px-2 hover:bg-opacity-70">
            <i className="ri-close-fill icons text-base text-xl"></i>
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
              <Popover.Button>
                <i
                  className={`ri-user-3-fill text-3xl ${
                    pathname === "/user/profile" ? "text-gold/50" : "icons text-gold"
                  }`}
                  onClick={() => navigate(!token ? "/user/signIn" : "/user/profile")}
                />
              </Popover.Button>
              <i className="icons ri-shopping-cart-2-fill text-3xl  text-gold" />
            </section>
          </nav>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
