import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { success } from "src/components/notifications";
import { emptyCart } from "src/redux/reducers/shoppingCart";

export function PaymentInProcess({ transactionId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(transactionId)
      .then(() => success("Identificador de transacción copiado al portapapeles"))
      .catch((err) => console.error("Error al copiar al portapapeles", err));
  };

  useEffect(() => {
    dispatch(emptyCart());
  }, []);

  return (
    <main className="grid gap-6 text-center">
      <h1>{t("shopping-cart.payment-ok")}</h1>
      <p className="mx-auto w-fit">
        <i className="ri-time-line text-6xl text-yellow-600"></i>
      </p>
      <h2>{t("shopping-cart.we-contact-you-process")}</h2>
      <h2 className="textGoldGradient">
        Identificador de transacción: <strong onClick={copyToClipboard}>{transactionId}</strong>
      </h2>
    </main>
  );
}
