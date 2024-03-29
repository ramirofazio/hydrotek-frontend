import { Pages, DashboardHeader } from ".";
import { IconButtonWithBgGold } from "src/components/buttons";
import { Products, Blog, Orders, Users, MoreActions, PromotionalCodes } from "./pages/index";
import { useEffect, useState } from "react";
import { deleteOfStorage, getOfStorage, saveInStorage } from "src/utils/localStorage";
import { WorkInProgressModal } from "src/components";

const buttons = [
  { icon: "ri-logout-box-r-line", text: "salir" },
  { icon: "ri-image-2-fill", text: "productos" },
  { icon: "ri-shopping-cart-2-fill", text: "ordenes" },
  { icon: "ri-user-3-fill", text: "usuarios" },
  { icon: "ri-pencil-line", text: "blog" },
  { icon: "ri-coupon-2-fill", text: "cupones" },
  { icon: "ri-more-fill", text: "más acciones" },
];

const componentMapping = {
  ordenes: <Orders />,
  usuarios: <Users />,
  productos: <Products />,
  blog: <Blog />,
  "más acciones": <MoreActions />,
  cupones: <PromotionalCodes />,
};

export function Dashboard() {
  const [selected, setSelected] = useState(getOfStorage("selected") || "productos");
  const [show, setShow] = useState(false);

  useEffect(() => {
    saveInStorage("selected", selected);
  }, [selected]);

  const selectedComponent = componentMapping[selected];

  const handleChangeSelected = (text) => {
    if (text === "salir") {
      window.close() || window.location.replace("/");
      deleteOfStorage("selected");
    } else if (text === "blog") {
      setShow(true);
    } else {
      setSelected(text);
    }
  };

  return (
    <main className="grid w-full place-content-center gap-4  p-8 text-center lg:place-content-stretch lg:text-left">
      <DashboardHeader />
      <WorkInProgressModal isOpen={show} onClose={() => setShow(false)} dashboard={true} />
      <section className="flex w-full flex-col items-center gap-4 lg:flex-row">
        {buttons.map(({ icon, text }, index) => (
          <IconButtonWithBgGold
            key={index}
            icon={`${icon} !justify-start`}
            text={text}
            className={`!aspect-auto h-10 w-full items-center !justify-start ${text === "salir" && "lg:hidden"} ${
              selected === text ? "pointer-events-none opacity-50" : "opacity-100"
            }`}
            textClassName={"ml-10"}
            onClick={() => handleChangeSelected(text)}
          />
        ))}
      </section>
      <Pages selectedComponent={selectedComponent} />
      <IconButtonWithBgGold
        className={"absolute bottom-0 mx-auto my-4"}
        icon={"ri-arrow-up-s-line"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </main>
  );
}
