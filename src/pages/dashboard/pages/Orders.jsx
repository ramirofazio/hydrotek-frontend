import { useLoaderData, useNavigate } from "react-router-dom";
import { TableRow } from "./index";
import { error, success } from "src/components/notifications";
import { APIHydro } from "src/api";
import { useState } from "react";
import { Modal } from "src/components";

const colsTitles = ["fresa id", "nombre", "email", "fecha", "precio total", "productos", "estado"];

export function Orders() {
  const navigate = useNavigate();
  const { allOrders } = useLoaderData();

  const [productsModal, setProductsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(false);

  async function handleUpdateOrder(fresaId, status) {
    if (status === 200) {
      success("esta orden esta paga");
      return;
    }

    try {
      APIHydro.markOrderAsPay(fresaId).then((res) => {
        if (res.status === 200) {
          success("Orden actualizada con exito");
          navigate();
        }
      });
    } catch (e) {
      console.log(e);
      error(e.message);
    }
  }

  function handleSeeProducts(fresaId) {
    const selectedOrder = allOrders.find((o) => o.fresaId === fresaId);
    setSelectedOrder(selectedOrder);
    setProductsModal(true);
  }

  return (
    <main className="w-full">
      <Modal isOpen={productsModal} onClose={() => setProductsModal(false)} panelSize={"!max-w-4xl"}>
        <h1>
          PRODUCTOS DE LA ORDEN <strong className="pointer-events-none">{selectedOrder.fresaId}</strong>
        </h1>
        <table className="my-4 w-full text-white">
          <thead className="border border-gold">
            <tr className="goldGradient text-base uppercase">
              {["nombre", "cantidad", "precio unitario", "precio total"].map((e, index) => (
                <th
                  className="border-r-2 border-r-blue px-2  py-2 text-xs last:border-none xl:px-0 xl:text-center xl:text-sm"
                  key={index}
                >
                  {e}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedOrder &&
              selectedOrder.products.map((p, index) => (
                <tr className="even:bg-gold/10" key={index}>
                  <TableRow content={p.name} />
                  <TableRow content={p.quantity} />
                  <TableRow
                    content={p.price.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  />
                  <TableRow
                    content={(p.price * p.quantity).toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  />
                </tr>
              ))}
          </tbody>
        </table>
      </Modal>
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
          {allOrders.map(({ user: { name, email }, date, fresaId, status, totalPrice }, index) => {
            return (
              <tr key={index} className="even:bg-gold/10">
                <TableRow content={fresaId} />
                <TableRow content={name} style="capitalize" />
                <TableRow content={email} style />
                <TableRow content={new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString()} />

                <TableRow
                  content={totalPrice.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                />
                <TableRow
                  content={
                    <i
                      className={`ri-eye-line textGoldGradient icons text-2xl`}
                      onClick={() => handleSeeProducts(fresaId)}
                    />
                  }
                />
                <TableRow
                  content={
                    <i
                      className={`ri-${status === 200 ? "check" : "time"}-line icons text-2xl text-${
                        status === 200 ? "green" : "red"
                      }-500`}
                      onClick={() => handleUpdateOrder(fresaId, status)}
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
