import { Loader, Modal } from "src/components";
import { useState } from "react";
import { TableRow } from "./index";
import { APIHydro } from "src/api";

export function UpdateProductPromCodes({ modal, setModal, related, allCodes }) {
  const [loading, setLoading] = useState(false);
  const { productId, promotionalCodes } = related;

  const colsTitles = ["codigo", "descuento", "estado", "desvincular"];

  async function removeRelatedCode() {
    const res = await APIHydro.removePromotionalCode();
  }
  console.log(related);
  return (
    <Modal panelSize="min-w-full min-h-screen" isOpen={Boolean(modal)} onClose={() => setModal(false)}>
      {loading && <Loader />}
      <table className="my-4 w-full text-white">
        <thead className="border border-gold">
          <tr className="goldGradient text-base uppercase">
            {colsTitles.map((title, i) => (
              <th
                className="border-r-2 border-r-blue px-2  py-2 text-xs last:border-none xl:px-0 xl:text-center xl:text-sm"
                key={i}
              >
                {title}
              </th>
            ))}
            {/* <th className="grid place-items-center border-r-2  border-r-blue px-2 py-2 text-xs last:border-none xl:px-0 xl:text-center">
              <i className="ri-add-fill icons font-bold" onClick={handleAddPromotionalCode} />
            </th> */}
          </tr>
        </thead>
        <tbody>
          {promotionalCodes?.length &&
            promotionalCodes.map(({ promotionalCode }, index) => {
              const { id, code, discount, active } = promotionalCode;
              console.log("MODAL", promotionalCode);
              return (
                <tr key={index} className="even:bg-gold/10">
                  <TableRow content={code} />
                  <TableRow content={`${discount} %`} />
                  <TableRow
                    content={
                      <i
                        className={`ri-checkbox-blank-circle-fill flex items-center justify-center gap-2 text-xl ${
                          active ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        <p className="font-primary uppercase">{active ? "habilitado" : "deshabilitado"}</p>
                      </i>
                    }
                  />
                  <TableRow
                    content={
                      <i className="ri-close-fill icons text-2xl text-red-500" onClick={() => removeRelatedCode(id)} />
                    }
                  />
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* {promotionalCodes?.length ? (
        promotionalCodes.map(({ promotionalCode }, i) => (
          <div className="border-2 border-gold" key={i}>
            <p>{promotionalCode.code}</p>
            <p>{promotionalCode.discount}</p>
            <i
              className={`ri-checkbox-blank-circle-fill ${promotionalCode.active ? "text-green-500" : "text-red-500"}`}
            >
              {promotionalCode.active ? "habilitado" : "deshabilitado"}
            </i>
          </div>
        ))
      ) : (
        <h1>Claro sos mas profunda</h1>
      )} */}
    </Modal>
  );
}
