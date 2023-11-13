import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { APIHydro } from "src/api";
import { Loader } from "src/components";
import { IconButtonWithBgGold } from "src/components/buttons";
import { TableRow } from "./Utils";

export function MoreActions() {
  const [loader, setLoader] = useState(false);
  const { lastUsdPrice } = useLoaderData();

  const [thisLastUsdPrice, setThisLastUsdPrice] = useState(lastUsdPrice);

  const handleManualUsdUpdate = async () => {
    const res = confirm(
      "¿Seguro que quieres actualizar MANUALMENTE la cotizacion del dolar? ¡Esto afectara los precios de los productos!"
    );

    if (!res) return;

    setLoader(true);
    try {
      const res = await APIHydro.manualUsdUpdate();
      if (res) {
        //! TOAST
        setThisLastUsdPrice((prev) => ({ ...prev, price: res }));
        setLoader(false);
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  return (
    <main className="w-full">
      {loader && <Loader />}
      <section className="flex w-full flex-col p-4">
        <h1 className="textGoldGradient mt-6 text-center text-2xl">Actualizar cotizacion dolar</h1>
        <table className="my-4 w-full text-white">
          <thead className="border border-gold">
            <tr className="goldGradient text-base uppercase">
              <th className="px-6 py-2">Ultima Actualizacion</th>
              <th className="px-6 py-2">Precio</th>
              <th className="px-6 py-2">Actualizar</th>
            </tr>
          </thead>
          <tbody>
            <TableRow content={thisLastUsdPrice.date} />
            <TableRow content={`$ 1 USD -> $ ${thisLastUsdPrice.price} ARS`} />
            <TableRow
              content={<i className={"icons ri-refresh-fill text-3xl text-red-500"} onClick={handleManualUsdUpdate} />}
            />
          </tbody>
        </table>
      </section>
      <IconButtonWithBgGold
        className={"absolute bottom-0 mx-auto my-4"}
        icon={"ri-arrow-up-s-line"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </main>
  );
}
