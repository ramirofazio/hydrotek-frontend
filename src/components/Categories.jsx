import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function Categories() {
  const categories = [
    { name: "SISTEMAS", value: 1 },
    { name: "PLUGS", value: 2 },
    { name: "SAFE ROOTS", value: 3 },
    { name: "CANASTAS", value: 4 },
  ];

  return (
    <Listbox>
      <div className="relative md:static">
        <Listbox.Button className="flex place-items-center">
          <h2 className="text-white ">CATEGORÍAS</h2>
          <ChevronDownIcon className="ml-1 h-4 w-4 text-gold" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Listbox.Options className="relative inset-0 top-1 flex flex-col place-items-center gap-2 rounded-sm bg-black/60 py-2 text-sm text-white/80  md:fixed md:inset-auto md:mt-0.5">
            {categories.map((c, i) => (
              <NavLink
                to="/products"
                key={i}
                //Eg de filtrado onClick={dispatch(setCategory(c.value))*/}
              >
                <Listbox.Option value={c.value} className="hover:text-white">
                  {c.name}
                </Listbox.Option>
              </NavLink>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
