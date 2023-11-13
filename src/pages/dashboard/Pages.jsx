import { IconButtonWithBgGold } from "src/components/buttons";
import { Products, Blog, Orders, Users, MoreActions } from "./pages/index";
import { useEffect, useState } from "react";
import { getOfStorage, saveInStorage } from "src/utils/localStorage";

const buttons = [
  { icon: "ri-image-2-fill", text: "productos" },
  { icon: "ri-shopping-cart-2-fill", text: "ordenes" },
  { icon: "ri-user-3-fill", text: "usuarios" },
  { icon: "ri-pencil-line", text: "blog" },
  { icon: "ri-more-fill", text: "más acciones" },
];

const componentMapping = {
  ordenes: <Orders />,
  usuarios: <Users />,
  productos: <Products />,
  blog: <Blog />,
  "más acciones": <MoreActions />,
};

export function Pages() {
  const [selected, setSelected] = useState(getOfStorage("selected") || "productos");

  useEffect(() => {
    saveInStorage("selected", selected);
  }, [selected]);

  const selectedComponent = componentMapping[selected];

  return (
    <main className="row-span-2 flex flex-col items-center gap-4">
      <section className="flex h-8 w-full justify-around">
        {buttons.map(({ icon, text }, index) => (
          <IconButtonWithBgGold
            key={index}
            icon={icon}
            text={text}
            className={`!aspect-auto w-52 items-center !justify-start ${
              selected === text ? "opacity-100" : "opacity-50"
            }`}
            textClassName={"ml-10"}
            onClick={() => setSelected(text)}
          />
        ))}
      </section>
      {selectedComponent}
    </main>
  );
}
