import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { APIHydro } from "src/api";
import { TableRow } from "./index";

const colsTitles = ["ultima Actualizacion", "precio", "actualizar"];

export function UsdPriceManager({ setLoader }) {
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
        setThisLastUsdPrice(res);
        setLoader(false);
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  return (
    <section className="flex w-full flex-col p-4">
      <h1 className="mt-10 text-xl">Actualizar cotizacion dolar</h1>
      <table className="my-4 w-full text-white">
        <thead className="border border-gold">
          <tr className="goldGradient text-base uppercase">
            {colsTitles.map((t, index) => (
              <th className="border-r-2 border-r-blue px-6 py-2 last:border-none" key={index}>
                {t}
              </th>
            ))}
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
  );
}
