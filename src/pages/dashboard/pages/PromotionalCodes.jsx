import { useLoaderData, useNavigate } from "react-router-dom";
import { TableRow } from "./index";
import { error, success } from "src/components/notifications";
import { APIHydro } from "src/api";
import { useState } from "react";
import { Modal } from "src/components";
import { Input } from "src/components/inputs";
import { Button } from "src/components/buttons";

const colsTitles = ["codigo", "descuento", "editar", "eliminar"];

export function PromotionalCodes() {
  const navigate = useNavigate();
  const { promotionalCodes } = useLoaderData();

  const [modal, setModal] = useState(false);
  const [newPromotionalCode, setNewPromotionalCode] = useState({
    id: "",
    code: "",
    discount: "",
    edit: false,
  });

  const handleRemovePromotionalCode = (id) => {
    const res = confirm("¿Seguro que quieres eliminar este cupon?");

    if (!res) return;

    try {
      APIHydro.removePromotionalCode(id).then((res) => {
        if (res.status === 200) {
          success("Cupon eliminado con exito");
          navigate();
        }
      });
    } catch (e) {
      console.log(e);
      error(e.message);
    }
  };

  const handleEditPromotionalCode = (id, code, discount) => {
    setNewPromotionalCode({
      id,
      code,
      discount,
      edit: true,
    });
    setModal(true);
  };

  const handleAddPromotionalCode = () => {
    setModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPromotionalCode.code && !newPromotionalCode.discount) {
      error("Por favor, completa los datos");
      return;
    }

    try {
      if (newPromotionalCode.edit) {
        APIHydro.editPromotionalCode({
          id: newPromotionalCode.id,
          code: newPromotionalCode.code.toUpperCase(),
          discount: Number(newPromotionalCode.discount),
        }).then((res) => {
          if (res.status === 200) {
            success("Cupon editado con exito");
            setNewPromotionalCode("");
            setModal(false);
            navigate();
          }
        });
      } else {
        APIHydro.createPromotionalCode({
          code: newPromotionalCode.code.toUpperCase(),
          discount: Number(newPromotionalCode.discount),
        }).then((res) => {
          if (res.status === 201) {
            success("Cupon creado con exito");
            setModal(false);
            setNewPromotionalCode("");
            navigate();
          }
        });
      }
    } catch (e) {
      console.log(e);
      error(e.message);
      setNewPromotionalCode("");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewPromotionalCode({
      ...newPromotionalCode,
      [name]: value,
    });
  };

  return (
    <main className="w-full">
      <Modal
        isOpen={modal}
        onClose={() => {
          setModal(false);
          setNewPromotionalCode("");
        }}
        panelSize={"!max-w-4xl"}
      >
        <h1 className="text-center">
          {newPromotionalCode.edit ? (
            <>
              CUPON <strong className="pointer-events-none border-none"> `{newPromotionalCode.code}`</strong> del
              <strong className="pointer-events-none border-none"> {newPromotionalCode.discount} %</strong>
            </>
          ) : (
            "CREAR NUEVO CUPON"
          )}
        </h1>
        <form onSubmit={handleSubmit} className="my-10 grid place-items-center gap-4">
          <Input
            name={"code"}
            placeholder={"Codigo del cupon"}
            type={"text"}
            value={newPromotionalCode.code}
            onChange={handleOnChange}
          />
          <div className="flex w-full items-center justify-between gap-10">
            <Input
              name={"discount"}
              placeholder={"Descuento del cupon"}
              type={"number"}
              value={newPromotionalCode.discount}
              onChange={handleOnChange}
            />
          </div>
          <Button text={newPromotionalCode.edit ? "Editar" : "Crear"} onClick={handleSubmit} className={"mx-20"} />
        </form>
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
            <th className="grid place-items-center border-r-2  border-r-blue px-2 py-2 text-xs last:border-none xl:px-0 xl:text-center">
              <i className="ri-add-fill icons font-bold" onClick={handleAddPromotionalCode} />
            </th>
          </tr>
        </thead>
        <tbody>
          {promotionalCodes.map(({ id, code, discount }, index) => {
            return (
              <tr key={index} className="even:bg-gold/10">
                <TableRow content={code} />
                <TableRow content={`${discount} %`} />
                <TableRow
                  content={
                    <i
                      className="ri-pencil-fill icons text-2xl"
                      onClick={() => handleEditPromotionalCode(id, code, discount)}
                    />
                  }
                />
                <TableRow
                  content={
                    <i
                      className="ri-close-fill icons text-2xl text-red-500"
                      onClick={() => handleRemovePromotionalCode(id)}
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
