
import { useLoaderData, useNavigate } from "react-router-dom";
import { APIHydro } from "src/api";
import { TableRow } from "./index";
import { dateTransform } from "./Utils";
import { success } from "src/components/notifications";

const colsTitles = ["ultima Actualizacion", "precio", "actualizar"];

export function UsdPriceManager({ setLoader }) {
  const navigate = useNavigate();
  const { lastUsdPrice } = useLoaderData();

  const handleManualUsdUpdate = async () => {
    const res = confirm(
      "¿Seguro que quieres actualizar MANUALMENTE la cotizacion del dolar? ¡Esto afectara los precios de los productos!"
    );

    if (!res) return;

    setLoader(true);
    try {
      const res = await APIHydro.manualUsdUpdate();
      if (res) {
        success("cotizacion actualizada");
        setLoader(false);
        navigate();
      }
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  return (
    <section className="flex w-full flex-col p-4">
      <h1 className="mt-10 text-xs lg:text-sm xl:text-lg">
        Actualizar <strong className="pointer-events-none">solo</strong> cotización
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
              <TableRow content={`${dateTransform(lastUsdPrice.date)} HS`} />
              <TableRow content={`$1 USD = $${lastUsdPrice.price} ARS`} />
              <TableRow
                content={
                  <i className={"icons ri-refresh-fill text-3xl text-red-500"} onClick={handleManualUsdUpdate} />
                }
              />
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
