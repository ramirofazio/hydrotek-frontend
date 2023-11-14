import { t } from "i18next";
import { logos } from "src/assets";
import { IconButtonWithBgGold } from "src/components/buttons";
import { deleteOfStorage } from "src/utils/localStorage";

export function DashboardHeader() {
  const handleExit = () => {
    deleteOfStorage("selected");
    window.close() || window.location.replace("/");
  };

  return (
    <main className="flex flex-col">
      <section className="flex items-center justify-center xl:w-full xl:justify-between">
        <img src={logos.hydText} className="w-60" />
        <IconButtonWithBgGold
          icon={"ri-logout-box-r-line"}
          onClick={() => handleExit()}
          text={"Salir"}
          className={"hidden xl:inline xl:!aspect-auto xl:w-fit"}
          textClassName={"ml-8 hidden xl:inline"}
        />
      </section>
      <h1 className="textGoldGradient my-4 border-gold  font-bold xl:border-b-2 xl:text-3xl">
        {t("common.dashboard")}
      </h1>
    </main>
  );
}
