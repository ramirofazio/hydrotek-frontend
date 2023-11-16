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
      <section className="flex items-center justify-center lg:w-full lg:justify-between">
        <img src={logos.hydText} className="w-60 lg:w-40 xl:w-60" />
        <IconButtonWithBgGold
          icon={"ri-logout-box-r-line"}
          onClick={() => handleExit()}
          text={"Salir"}
          className={"hidden lg:inline lg:!aspect-auto lg:w-fit"}
          textClassName={"ml-8 hidden xl:inline"}
        />
      </section>
      <h1 className="textGoldGradient my-4 border-gold font-bold lg:mx-auto  lg:w-fit lg:border-b-2 xl:border-b-2 xl:text-3xl">
        {t("common.dashboard")}
      </h1>
    </main>
  );
}
