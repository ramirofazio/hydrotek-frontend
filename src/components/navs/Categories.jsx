import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { categories } from "src/utils";

export function Categories() {
  const { t } = useTranslation();
  const param = useParams();
  let selectedCategory = false;

  if (param?.pag && param?.pag.length > 4) {
    const categoryId = param.pag.split("=")[1];
    selectedCategory = parseInt(categoryId);
  }
  return (
    <Listbox>
      <div className="relative lg:static">
        <Listbox.Button className="flex place-items-center">
          <h2 className="link-animation text-lg uppercase text-white">{t("navbar.categories")}</h2>
          <i className="ri-arrow-down-s-line ml-1 text-3xl text-gold lg:text-2xl" />
        </Listbox.Button>
        <Transition
          as={Fragment ? Fragment : null}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Listbox.Options className="relative inset-0 top-1 z-40 flex flex-col place-items-center gap-2 rounded-sm bg-black/60 py-2 text-sm text-white/80  lg:absolute lg:inset-auto lg:mt-0.5">
            <NavLink to={`/products/0`}>
              <Listbox.Option className={`p-2 px-3 hover:text-white `}>todos los productos</Listbox.Option>
            </NavLink>
            {categories.map((c, i) => (
              <NavLink to={`/products/type=${c.id}`} key={i + 1}>
                <Listbox.Option
                  value={c.value}
                  className={`p-2 px-3 hover:text-white ${
                    selectedCategory && selectedCategory === c.id ? "bg-gold-gradient text-purple-950" : ""
                  }`}
                >
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
