import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { error, success } from "src/components/notifications";
import { emptyCart } from "src/redux/reducers/shoppingCart";
import { deleteOfStorage, getOfStorage } from "src/utils/localStorage";
import { DeliveryInfoForm } from "./DeliveryInfoForm";
import { isValidSendInfo } from "src/utils/validation";
import { Button } from "src/components/buttons";
import { APIHydro } from "src/api";
import { useNavigate } from "react-router-dom";

export function PaymentOk({ transactionId, setLoader }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const session = useSelector((s) => s.user.session);
  const profile = useSelector((s) => s.user.profile);
  const { city, address, province, postalCode } = profile;
  const { id, name } = session;
  let mensajeWhatsApp = "";

  const [realtimeCorrection, setRealtimeCorrection] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(
    getOfStorage("deliveryInfo") || {
      active: false,
      address: address || "",
      city: city || "",
      province: province || "",
      postalCode: postalCode || "",
    }
  );
  const [errs, setErrs] = useState({
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  useEffect(() => {
    mensajeWhatsApp = `¡Hola Hydrotek! Soy ${name || ""}.

Acabo de hacer una compra en la web.
Mi identificador de transacción es: *${transactionId}*.

${
  deliveryInfo.active
    ? `Estos son mis datos de envío:

*- DIRECCION:* ${deliveryInfo.address}

*- LOCALIDAD:* ${deliveryInfo.city}

*- PROVINCIA:* ${deliveryInfo.province}

*- CODIGO POSTAL:* ${deliveryInfo.postalCode}
`
    : "¡Necesito coordinar el retiro de mis productos!"
}`;
  });

  function handleOnChange(e) {
    const { name, value } = e.target;

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

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(transactionId)
      .then(() => success("Identificador de transacción copiado al portapapeles"))
      .catch((err) => console.error("Error al copiar al portapapeles", err));
  };

  useEffect(() => {
    dispatch(emptyCart());

    return () => {
      deleteOfStorage("deliveryInfo");
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setRealtimeCorrection(true);
    if (deliveryInfo.active) setErrs(isValidSendInfo(deliveryInfo));
    if (Object.values(errs).length === 0) {
      setLoader(true);
      try {
        APIHydro.saveDeliveryInfo({ id, ...deliveryInfo })
          .then((res) => {
            if (res.status === 200) {
              navigate("/", { replace: true });
              success("Datos de envio guardados con exito");
              window.open(`https://wa.me/5491170823697?text=${encodeURIComponent(mensajeWhatsApp)}`, "_blank");
            }
          })
          .finally(() => setLoader(false));
      } catch (e) {
        error("hubo un problema guardando tus datos de envio");
        console.log(e);
        setLoader(false);
      }
    }
  }

  return (
    <main className="grid gap-6 text-center">
      <h1>{t("shopping-cart.payment-ok")}</h1>
      <p className="mx-auto w-fit">
        <i className="ri-checkbox-circle-line text-6xl text-green-600"></i>
      </p>
      {!deliveryInfo.active && (
        <>
          <h2>{t("shopping-cart.we-contact-you")}</h2>
          <i
            className="ri-whatsapp-line icons textGoldGradient mx-auto w-fit text-6xl hover:text-green-600"
            onClick={() =>
              window.open(`https://wa.me/5491170823697?text=${encodeURIComponent(mensajeWhatsApp)}`, "_blank")
            }
          />
          <h2 className="textGoldGradient">
            Identificador de transacción: <br />
            <strong onClick={copyToClipboard}>{transactionId || "0000000000000000"}</strong>
          </h2>
        </>
      )}
      <div>
        {!deliveryInfo.active && (
          <p className="text-[14px]">
            La opcion predeterminada es <br /> <b className="underline">retiro en sucursal.</b> <br />
            <br />
          </p>
        )}
        <p className="text-[14px]">
          ¿{deliveryInfo.active ? "No necesitas" : "Necesitas"} envio?
          <strong className="ml-2" onClick={() => setDeliveryInfo({ ...deliveryInfo, active: !deliveryInfo.active })}>
            Apreta aca
          </strong>
        </p>
      </div>
      {deliveryInfo.active && (
        <form onSubmit={handleSubmit} className="grid gap-6">
          <h2 className="textGoldGradient font-bold">completa tus datos</h2>
          <DeliveryInfoForm
            handleOnChange={handleOnChange}
            realtimeCorrection={realtimeCorrection}
            errs={errs}
            deliveryInfo={deliveryInfo}
          />
          {city && address && postalCode && province && (
            <p>
              Estos datos se han autocompletado con la información de envío de tu último pedido. Si deseas realizar
              actualizaciones,
              <strong
                className="ml-1"
                onClick={() => setDeliveryInfo({ active: true, address: "", city: "", province: "", postalCode: "" })}
              >
                ¡simplemente cámbialos!
              </strong>
            </p>
          )}
          <Button
            text={"continuar"}
            onClick={handleSubmit}
            className={"mx-20"}
            disabled={deliveryInfo.active && !Object.values(deliveryInfo).every((p) => p !== "")}
          />
        </form>
      )}
    </main>
  );
}
