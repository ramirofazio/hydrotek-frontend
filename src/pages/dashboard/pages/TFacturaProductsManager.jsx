import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { APIHydro } from "src/api";
import { TableRow } from "./index";
import { success } from "src/components/notifications";

const colsTitles = ["ultima Actualizacion", "Cant. Productos", "actualizar"];

export function TFacturaProductsManager({ setLoader }) {
  const { products } = useLoaderData();

  const [thisProducts, setThisProducts] = useState({ date: products[0]?.updated, qty: products.length }); //? Agarro la propiedad 'updated' del primer producto

  const handleManualProductUpdate = async () => {
    const res = confirm(
      "¿Seguro que quieres actualizar los productos de la web? ¡Esto actualizara SOLO los productos, NO los precios!"
    );

    if (!res) return;

    setLoader(true);
    try {
      const res = await APIHydro.manualTFacturaProductsUpdate();
      if (res) {
        success("Productos actualizados")
        setThisProducts({ date: res.data[0].updated, qty: res.data.length });
        setLoader(false);
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  return (
    <section className="flex w-full flex-col p-4">
      <h1 className="mt-10 text-xs lg:text-sm xl:text-lg">
        Actualizar <strong className="pointer-events-none">solo</strong> productos
      </h1>
      <div className="overflow-scroll">
        <table className="my-4 w-full text-white">
          <thead className="border border-gold">
            <tr className="goldGradient text-base uppercase">
              {colsTitles.map((t, index) => (
                <th
                  className="border-r-2 border-r-blue px-2  py-2 text-xs last:border-none xl:px-0 xl:text-center xl:text-sm"
                  key={index}
                >
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableRow content={`${thisProducts.date} HS`} />
              <TableRow content={`${thisProducts.qty} Productos`} />
              <TableRow
                content={
                  <i className={"icons ri-refresh-fill text-3xl text-red-500"} onClick={handleManualProductUpdate} />
                }
              />
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
