import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { success } from "src/components/notifications";
import { emptyCart } from "src/redux/reducers/shoppingCart";
import { deleteOfStorage, getOfStorage } from "src/utils/localStorage";

export function PaymentOk({ transactionId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //todo: En algun momento habria que guardar esta info si es un user loggeado
  const sendInfo = getOfStorage("deliveryInfo");

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(transactionId)
      .then(() => success("Identificador de transacción copiado al portapapeles"))
      .catch((err) => console.error("Error al copiar al portapapeles", err));
  };

  useEffect(() => {
    dispatch(emptyCart());

    // return () => {
    //   deleteOfStorage("sendInfo");
    // };
  }, []);

  const mensajeWhatsApp = `¡Hola Hydrotek!

Acabo de hacer una compra en la web.
Mi identificador de transacción es: *${transactionId}*.

${
  sendInfo
    ? `Estos son mis datos de envío:

*- DIRECCION:* ${sendInfo.adress}

*- LOCALIDAD:* ${sendInfo.city}

*- PROVINCIA:* ${sendInfo.province}

*- CODIGO POSTAL:* ${sendInfo.postalCode}
`
    : "¡Necesito coordinar el retiro de mis productos!"
}`;

  return (
    <main className="grid gap-6 text-center">
      <h1>{t("shopping-cart.payment-ok")}</h1>
      <p className="mx-auto w-fit">
        <i className="ri-checkbox-circle-line text-6xl text-green-600"></i>
      </p>
      <h2>{t("shopping-cart.we-contact-you")}</h2>
      <i
        className="ri-whatsapp-line icons textGoldGradient mx-auto w-fit text-6xl hover:text-green-600"
        onClick={() => window.open(`https://wa.me/5491170823697?text=${encodeURIComponent(mensajeWhatsApp)}`, "_blank")}
      />
      <h2 className="textGoldGradient">
        Identificador de transacción: <strong onClick={copyToClipboard}>{transactionId || "0000000000000000"}</strong>
      </h2>
    </main>
  );
}
