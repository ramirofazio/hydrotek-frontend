import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function SearchBar() {
  const { t } = useTranslation();
  const mockProducts = ["sistema x", "fertilizante a", "plug 0-34"];
  const query = useState("")

  return (
    <div className="w-fit border-[1px] border-gold">
      <Combobox>
        <div className="relative flex w-fit place-items-center">
          <Combobox.Input
            placeholder={t("common.search")}
            className="ml-1 bg-transparent p-1 text-white focus:border-0 focus:outline-0"
          />
          <Combobox.Button className="goldGradient rounded-sm">
            <MagnifyingGlassIcon className="m-1 h-6 w-6 text-white" />
          </Combobox.Button>
        </div>

        <Combobox.Options className="absolute  border-2">
          {mockProducts.map((p, i) => {
            <Combobox.Option key={i}><p>HOLAAA</p></Combobox.Option>;
          })}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
