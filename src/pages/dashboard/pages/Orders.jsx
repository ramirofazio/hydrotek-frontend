import { useLoaderData } from "react-router-dom";
import { TableRow } from "./index";

const colsTitles = ["fresa id", "fecha", "precio", "ultima actualización"];

export function Orders() {
  const { orders } = useLoaderData();

  return (
    <main className="w-full">
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
          {orders.map(({ product: { fresaId, name }, quantity, price, totalPrice }, index) => {
            return (
              <tr key={id} className="even:bg-gold/10">
                <TableRow content={fresaId} />
                <TableRow content={name} style />
                <TableRow
                  content={totalPrice.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                  style="text-left"
                />
                <TableRow content={updated} />
                <TableRow
                  content={
                    <i
                      className={`ri-${published ? "check" : "close"}-fill text-2xl text-${
                        published ? "green" : "red"
                      }-500`}
                    />
                  }
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
