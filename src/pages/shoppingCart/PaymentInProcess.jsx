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

export function PaymentInProcess({ transactionId, status, setLoader }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const session = useSelector((s) => s.user.session);
  const profile = useSelector((s) => s.user.profile);
  const { city, address, province, postalCode } = profile;
  const { id, name } = session;
  let mensajeWhatsApp = "";
  const order = getOfStorage("order");

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
    dispatch(emptyCart());

    return () => {
      deleteOfStorage("deliveryInfo");
      deleteOfStorage("order");
    };
  }, []);

  useEffect(() => {
    mensajeWhatsApp = `¡Hola Hydrotek!${(name && ` Soy ${name}`) || ""}.

Acabo de hacer una compra en la web. Elegi el metodo *EFECTIVO*
Mi identificador de transacción es: *${transactionId}*.

${
  (!deliveryInfo.active && !id && deliveryInfo.address !== "") ||
  (id && name && deliveryInfo.active && Boolean(isValidSendInfo(deliveryInfo)))
    ? `Estos son mis datos de envío:

*- DIRECCION:* ${deliveryInfo.address}

*- LOCALIDAD:* ${deliveryInfo.city}

*- PROVINCIA:* ${deliveryInfo.province}

*- CODIGO POSTAL:* ${deliveryInfo.postalCode}
`
    : "¡Necesito coordinar el retiro de mis productos!"
}


${order.items && "*- PRODUCTOS:*"}

${
  order.items &&
  order.items
    .map((item) => {
      return `- ${item.name.toUpperCase()} x${item.quantity}`;
    })
    .join("\n")
}
`;
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

  function handleSubmit(e) {
    e.preventDefault();
    setRealtimeCorrection(true);
    if (deliveryInfo.active) setErrs(isValidSendInfo(deliveryInfo));

    try {
      if (id && name && order) {
        APIHydro.createOrder({
          id,
          totalPrice: order.totalPrice,
          fresaId: transactionId,
          status: status,
          items: [...order.items],
        }).then((res) => {
          if (res.status === 201) {
            success("Orden creada y guardada con exito");
          }
        });
      }

      if (deliveryInfo.active && Object.values(errs).length === 0 && id) {
        APIHydro.saveDeliveryInfo({ id, ...deliveryInfo }).then((res) => {
          if (res.status === 200) {
            success("Datos de envio guardados con exito");
          }
        });
      }
    } catch (e) {
      error("hubo un problema");
      console.log(e);
      setLoader(false);
    }

    navigate("/", { replace: true });
    window.open(`https://wa.me/5491170823697?text=${encodeURIComponent(mensajeWhatsApp)}`, "_blank");
  }

  return (
    <main className="grid gap-6 text-center">
      <h1>{t("shopping-cart.payment-ok")}</h1>
      <p className="mx-auto w-fit">
        <i className="ri-time-line text-6xl text-yellow-600"></i>
      </p>
      {!deliveryInfo.active && (
        <>
          <h2>{t("shopping-cart.we-contact-you-process")}</h2>
          <i
            className="ri-whatsapp-line icons textGoldGradient mx-auto w-fit text-6xl hover:text-green-600"
            onClick={handleSubmit}
          />
          <h2 className="textGoldGradient">
            Identificador de transacción: <br />
            <strong onClick={copyToClipboard}>{transactionId || "0000000000000000"}</strong>
          </h2>
        </>
      )}
      {id && name && (
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
      )}
      {id && name && deliveryInfo.active && (
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
            onClick={(e) => handleSubmit(e)}
            className={"mx-20"}
            disabled={deliveryInfo.active && !Object.values(deliveryInfo).every((p) => p !== "")}
          />
        </form>
      )}
    </main>
  );
}
