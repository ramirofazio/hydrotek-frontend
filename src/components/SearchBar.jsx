import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const mockProducts = ["sistema x", "fertilizante a", "plug 0-34", "enraizador3"];

export function SearchBar() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  // ? Basica logica de filtrado de la searchbar, disponible a cambios.
  // Falta la logica de bsuqueda/filtrado en el onClick del Combobox.Button

  const filteredProducts =
    query === ""
      ? mockProducts
      : mockProducts.filter((person) => {
        return person.toLowerCase().includes(query.toLowerCase());
      });

  return (
    <div className="w-fit border-[1px] border-gold mx-auto">
      <Combobox>
        <div className="relative flex w-fit place-items-center ">
          <Combobox.Input
            className="ml-1 bg-transparent p-1 text-white focus:outline-none"
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("common.search")}
          />
          <Combobox.Button className="goldGradient rounded-sm">
            <MagnifyingGlassIcon className="m-1 h-6 w-6 text-white" />
          </Combobox.Button>
        </div>
        <Combobox.Options className="border-2 border-black/40 bg-black/80 absolute shadow-2xl mt-2">
          {filteredProducts.map((product, i) => (
            <Combobox.Option key={i} value={product} className="my-4 mx-3">
              <h1 className="text-sm">{product}</h1>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
