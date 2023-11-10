import { useTranslation } from "react-i18next";

export function PaymentOk({ orderId = 1625378 }) {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("shopping-cart.payment-ok")}</h1>
      <p className="mx-auto w-fit">
        <i className="ri-checkbox-circle-line text-6xl text-green-600"></i>
      </p>
      <h2 className="my-2">{t("shopping-cart.we-contact-you")}</h2>
      <h2 className="textGoldGradient mt-4">Numero de orden: {orderId}</h2>
    </>
  );
}
