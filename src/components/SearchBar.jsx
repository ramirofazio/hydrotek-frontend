import { Combobox } from "@headlessui/react";
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
    <div className="mx-auto w-fit rounded-md border-[2px] border-gold">
      <Combobox>
        <div className="relative flex w-fit place-items-center ">
          <Combobox.Input
            className="ml-1 bg-transparent p-1 text-white focus:outline-none"
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("common.search")}
          />
          <Combobox.Button className="bg-gold">
            <i className="ri-search-line text-2xl text-base" />
          </Combobox.Button>
        </div>
        <Combobox.Options className="absolute z-50 mt-2 border-2 border-black/40 bg-black/80 shadow-2xl">
          {filteredProducts.map((product, i) => (
            <Combobox.Option key={i} value={product} className="mx-3 my-4">
              <h1 className="text-sm">{product}</h1>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
