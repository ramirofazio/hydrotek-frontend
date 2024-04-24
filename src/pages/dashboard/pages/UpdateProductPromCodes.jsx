import { Loader, Modal } from "src/components";
import { useState } from "react";
import { TableRow } from "./index";
import { APIHydro } from "src/api";
import toast from "react-hot-toast";

export function UpdateProductPromCodes({ modal, setModal, related, setRelated, allCodes }) {
  const [loading, setLoading] = useState(false);
  let { productId, promotionalCodes } = related;
  console.log("all", allCodes);
  const colsTitles = ["codigo", "descuento", "estado", "desvincular"];

  async function unRelatePromCode(promotionalCodeId) {
    try {
      setLoading(true);
      const res = await APIHydro.unRelatePromotionalCode({ productId, promotionalCodeId });
      if (res) {
        setRelated({
          productId,
          promotionalCodes: promotionalCodes.filter((code) => code.id !== promotionalCodeId),
        });
        toast.success("Código desvinculado con exito");
      }
    } catch (err) {
      console.log(err);
      toast.error(`Error ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function relatePromCode({ target }) {
    try {
      setLoading(true);
      if (target.value === "") return;
      const newPromCode = allCodes.find((code) => code.id === target.value);
      if (promotionalCodes.find((code) => code.id === newPromCode.id)) {
        return toast.error("Este código ya esta vinculado");
      }
      const res = await APIHydro.relatePromotionalCode({ productId, promotionalCodeId: target.value });
      if (res) {
        promotionalCodes.push(newPromCode);
        toast.success("Código vinculado con exito");
      }
    } catch (err) {
      console.log(err);
      toast.error(`Error ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal panelSize="min-w-full min-h-screen" isOpen={Boolean(modal)} onClose={() => setModal(false)}>
      {loading && <Loader />}
      <h1 className="textGoldGradient my-4 border-gold font-bold lg:mx-auto  lg:w-fit lg:border-b-2 xl:border-b-2 xl:text-3xl">
        CÓDIGOS PROMOCIONALES VINCULADOS
      </h1>
      {!promotionalCodes?.length && (
        <h2 className="my-10 font-bold lg:mx-auto lg:w-fit  lg:text-xl ">No dispone de códigos vinculados</h2>
      )}
      <table className={`my-4 w-full text-white ${!promotionalCodes?.length && "hidden"}`}>
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
          </tr>
        </thead>
        <tbody>
          {promotionalCodes?.length &&
            promotionalCodes.map(({ id, code, discount, active }, index) => {
              return (
                <tr key={index} className="even:bg-gold/10">
                  <TableRow content={<p className="font-primary text-base text-white">{code}</p>} />
                  <TableRow content={<p className="font-primary text-base text-white">{`${discount} %`}</p>} />
                  <TableRow
                    content={
                      <i
                        className={`ri-checkbox-blank-circle-fill flex items-center justify-center gap-2 text-xl ${
                          active ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        <p className="font-primary text-base uppercase text-white">
                          {active ? "habilitado" : "deshabilitado"}
                        </p>
                      </i>
                    }
                  />
                  <TableRow
                    content={
                      <i className="ri-close-fill icons text-3xl text-red-500" onClick={() => unRelatePromCode(id)} />
                    }
                  />
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="mx-auto mt-10 flex w-fit flex-col gap-2 border-y-2 py-4">
        <p className="text-xl">Vincular nuevo código promocional</p>
        <select onChange={(e) => relatePromCode(e)} className="hover:cursor-pointer">
          <option value="" className="">
            Elija un codigo
          </option>
          {allCodes?.length ? (
            allCodes.map(({ code, id }, i) => (
              <option value={id} key={i}>
                {code}
              </option>
            ))
          ) : (
            <option value="">No hay códigos promocionales</option>
          )}
        </select>
      </div>
    </Modal>
  );
}
