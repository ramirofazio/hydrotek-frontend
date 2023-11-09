import { t } from "i18next";
import { useState } from "react";
import { APIHydro } from "src/api";
import { Loader } from "src/components";
import { IconButtonWithBgGold } from "src/components/buttons";
import { deleteOfStorage } from "src/utils/localStorage";

export function DashboardHeader() {
  const [loader, setLoader] = useState(false);

  const handleUpdateTFactura = async () => {
    setLoader(true);
    const res = await APIHydro.updateTFacturaProducts();
    console.log(res);
    if (res === "success") {
      setLoader(false);
    }
  };

  const handleExit = () => {
    deleteOfStorage("selected");
    window.close();
  };

  return (
    <main className="row-span-1  flex w-full items-center justify-between gap-5">
      {loader && <Loader />}
      <h1 className="text-2xl">{t("common.dashboard")}</h1>
      <section className="flex gap-5">
        <IconButtonWithBgGold
          icon={"ri-logout-box-r-line"}
          onClick={() => handleExit()}
          text={"Salir"}
          className={"!aspect-auto w-fit"}
          textClassName={"ml-8"}
        />
        <IconButtonWithBgGold
          icon={"ri-restart-line "}
          onClick={() => handleUpdateTFactura()}
          text={"Actualizar TFactura"}
          className={"!aspect-auto w-fit"}
          textClassName={"ml-8"}
        />
      </section>
    </main>
  );
}
