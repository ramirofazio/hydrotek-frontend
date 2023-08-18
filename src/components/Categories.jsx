import { Listbox } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function Categories() {

  const categories = [
    { name: "SISTEMAS", value: 1 },
    { name: "PLUGS", value: 2 },
    { name: "SAFE ROOTS", value: 3 },
    { name: "CANASTAS", value: null },
  ];

  return (
    <Listbox>
      <div className="relative">
        <Listbox.Button>
          <h2 className="inline text-white ">CATEGORÍAS</h2>
          <ChevronDownIcon className="ml-1 inline h-4 w-4 text-gold" />
        </Listbox.Button>
        <Listbox.Options className="relative inset-0 top-1 flex flex-col place-items-center gap-2 rounded-sm bg-black/60 py-2 text-sm text-white/80">
          {categories.map((c, i) => (
            <NavLink to="/products" key={i}
              //Eg de filtrado onClick={dispatch(setCategory(c.value))*/}
            >
              <Listbox.Option value={c.value}>
                {c.name}
              </Listbox.Option>
            </NavLink>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
