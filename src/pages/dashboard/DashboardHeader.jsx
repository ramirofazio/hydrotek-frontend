import { t } from "i18next";
import { IconButtonWithBgGold } from "src/components/buttons";

export function DashboardHeader() {
  const handleUpdateTFactura = () => {
    //! Logica para actualizar TFactura
  };
  return (
    <main className="flex  w-full items-center justify-between gap-5">
      <h1 className="text-2xl">{t("common.dashboard")}</h1>
      <section className="flex gap-5">
        <IconButtonWithBgGold
          icon={"ri-logout-box-r-line"}
          onClick={() => window.close()}
          text={"Salir"}
          className={"aspect-auto w-fit"}
          textClassName={"ml-8"}
        />
        <IconButtonWithBgGold
          icon={"ri-restart-line "}
          onClick={() => handleUpdateTFactura()}
          text={"Actualizar TFactura"}
          className={"aspect-auto w-fit"}
          textClassName={"ml-8"}
        />
      </section>
    </main>
  );
}
