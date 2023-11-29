import { Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { APIHydro } from "src/api";
import { logos } from "src/assets";
import { Error, Loader, Modal } from "src/components";
import { Button } from "src/components/buttons";
import { Input } from "src/components/inputs";
import { error } from "src/components/notifications";
import { isValidGuestCheckout } from "src/utils/validation";

const fields = [
  { name: "firstName", label: "nombre" },
  { name: "lastName", label: "apellido" },
  { name: "email", label: "correo electronico" },
  { name: "dni", label: "DNI" },
  { name: "phone", label: "numero de telefono" },
];

export default function CheckoutForm({ isOpen, onClose, cleanProducts, setLoader }) {
  const [apiErr, setApiErr] = useState(null);
  const [realtimeCorrection, setRealtimeCorrection] = useState(false);
  const [errs, setErrs] = useState({ firstName: "", lastName: "", email: "", dni: "", phone: "" });
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dni: "",
    phone: "",
  });

  function handleOnChange(e) {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    setErrs(
      isValidGuestCheckout({
        ...userInfo,
        [name]: value,
      })
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setRealtimeCorrection(true);
    setErrs(isValidGuestCheckout(userInfo));

    if (Object.values(errs).length === 0 && Object.values(userInfo).every((p) => p !== "")) {
      setLoader(true);
      onClose();
      try {
        APIHydro.guestCheckout({ ...userInfo, items: cleanProducts }).then((res) => {
          if (res) {
            window.location.replace(res.data);
          }
        });
      } catch (e) {
        console.error("Error during checkout:", e.message);
        error("Ha ocurrido un error durante el proceso de compra");
      }
    } else {
      error("es necesario que completes tus datos para continuar con la compra");
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <main className="my-4 grid grid-cols-1 place-content-center gap-6 text-center">
        <img src={logos.hydBlack} className="mx-auto w-20" />
        <Dialog.Title className="textGoldGradient">completa tus datos</Dialog.Title>
        <form onSubmit={handleSubmit} className="grid gap-6">
          {fields.map(({ name, label }, index) => (
            <Fragment key={index}>
              <Input
                name={name}
                type={name === "phone" || name === "dni" ? "number" : "text"}
                onChange={handleOnChange}
                value={userInfo[name]}
                placeholder={label}
                className={`relative ${errs[name] && realtimeCorrection && "border-red-500 focus:border-red-500/50"}`}
              />
              {errs[name] && realtimeCorrection && <Error text={errs[name]} className={"!text-white"} />}
            </Fragment>
          ))}
          {apiErr && <Error text={apiErr.message} />}
          <Button
            text={"continuar"}
            onClick={handleSubmit}
            className={"mx-20"}
            disabled={!Object.values(userInfo).every((p) => p !== "")}
          />
        </form>
      </main>
    </Modal>
  );
}
