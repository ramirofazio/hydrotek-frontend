import { t } from "i18next";
import { useState } from "react";
import { APIHydro } from "src/api";
import { logos } from "src/assets";
import { Loader } from "src/components";
import { IconButtonWithBgGold } from "src/components/buttons";
import { deleteOfStorage } from "src/utils/localStorage";

export function DashboardHeader() {
  const [loader, setLoader] = useState(false);

  const handleUpdateTFactura = async () => {
    setLoader(true);
    try {
      const res = await APIHydro.updateTFacturaProducts();
      if (res === "success") {
        //! TOAST
        setLoader(false);
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  const handleExit = () => {
    deleteOfStorage("selected");
    window.close();
  };

  return (
    <main className="flex w-full  flex-col items-center justify-center gap-5">
      {loader && <Loader />}
      <section className="flex w-full items-center justify-between">
        <img src={logos.hydText} className="w-60" />
        <IconButtonWithBgGold
          icon={"ri-logout-box-r-line"}
          onClick={() => handleExit()}
          text={"Salir"}
          className={"!aspect-auto w-fit"}
          textClassName={"ml-8"}
        />
      </section>
      <h1 className="textGoldGradient my-4 border-b-2 border-gold text-3xl font-bold">{t("common.dashboard")}</h1>
    </main>
  );
}
