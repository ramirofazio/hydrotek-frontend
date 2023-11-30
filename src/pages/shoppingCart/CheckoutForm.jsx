import { Dialog } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { APIHydro } from "src/api";
import { logos } from "src/assets";
import { Error, Modal } from "src/components";
import { Button } from "src/components/buttons";
import { Input } from "src/components/inputs";
import { error } from "src/components/notifications";
import { saveInStorage } from "src/utils/localStorage";
import { isValidGuestCheckout, isValidSendInfo } from "src/utils/validation";

const userInfoFields = [
  { name: "firstName", label: "nombre" },
  { name: "lastName", label: "apellido" },
  { name: "email", label: "correo electronico" },
  { name: "dni", label: "DNI" },
];

const deliveryInfoFields = [
  { name: "adress", label: "direccion" },
  { name: "city", label: "localidad" },
  { name: "province", label: "provincia" },
  { name: "postalCode", label: "codigo postal" },
];

export default function CheckoutForm({ isOpen, onClose, cleanProducts, setLoader }) {
  const [realtimeCorrection, setRealtimeCorrection] = useState(false);
  const [errs, setErrs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dni: "",
    adress: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dni: "",
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    active: false,
    adress: "",
    city: "",
    province: "",
    postalCode: "",
  });

  function handleOnChange(e, type) {
    const { name, value } = e.target;

    if (type === "userInfo") {
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
    } else {
      setDeliveryInfo({
        ...deliveryInfo,
        [name]: value,
      });

      setErrs(
        isValidSendInfo({
          ...deliveryInfo,
          [name]: value,
        })
      );
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setRealtimeCorrection(true);
    setErrs(isValidGuestCheckout(userInfo));
    if (deliveryInfo.active) setErrs(isValidSendInfo(deliveryInfo));

    if (Object.values(errs).length === 0 && Object.values(userInfo).every((p) => p !== "")) {
      if (deliveryInfo.active && Object.values(deliveryInfo).every((p) => p !== "")) {
        //todo: En algun momento habria que guardar esta info si es un user loggeado
        saveInStorage("deliveryInfo", deliveryInfo);
      }
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
    <Modal isOpen={isOpen} onClose={onClose} className={"max-w-2xl"}>
      <main className="my-4 grid  grid-cols-1 place-content-center gap-6 overflow-scroll text-center">
        <img src={logos.hydBlack} className="mx-auto w-20" />
        <Dialog.Title as="h1" className="textGoldGradient">
          completa tus datos
        </Dialog.Title>
        <form onSubmit={handleSubmit} className="grid gap-6">
          {userInfoFields.map(({ name, label }, index) => (
            <Fragment key={index}>
              <Input
                name={name}
                type={name === "dni" ? "number" : "text"}
                onChange={(e) => handleOnChange(e, "userInfo")}
                value={userInfo[name]}
                placeholder={label}
                className={`relative placeholder:capitalize ${
                  errs[name] && realtimeCorrection && "border-red-500 focus:border-red-500/50"
                }`}
              />
              {errs[name] && realtimeCorrection && (
                <Error text={errs[name]} className={"py-0 capitalize !text-white"} />
              )}
            </Fragment>
          ))}
          <div>
            {!deliveryInfo.active && (
              <p>
                La opcion predeterminada es <b className="underline">retiro en sucursal.</b> <br />
                <br />
              </p>
            )}
            <p>
              ¿{deliveryInfo.active ? "No necesitas" : "Necesitas"} envio?
              <strong
                className="ml-2"
                onClick={() => setDeliveryInfo({ ...deliveryInfo, active: !deliveryInfo.active })}
              >
                Apreta aca
              </strong>
            </p>
          </div>
          {deliveryInfo.active &&
            deliveryInfoFields.map(({ name, label }, index) => (
              <Fragment key={index}>
                <Input
                  name={name}
                  type={name === "postalCode" ? "number" : "text"}
                  onChange={(e) => handleOnChange(e, "deliveryInfo")}
                  value={deliveryInfo[name]}
                  placeholder={label}
                  className={`relative placeholder:capitalize ${
                    errs[name] && realtimeCorrection && "border-red-500 focus:border-red-500/50"
                  }`}
                />
                {errs[name] && realtimeCorrection && (
                  <Error text={errs[name]} className={"py-0 capitalize !text-white"} />
                )}
              </Fragment>
            ))}

          <Button
            text={"continuar"}
            onClick={handleSubmit}
            className={"mx-20"}
            disabled={
              !Object.values(userInfo).every((p) => p !== "") ||
              (deliveryInfo.active && !Object.values(deliveryInfo).every((p) => p !== ""))
            }
          />
        </form>
      </main>
    </Modal>
  );
}
