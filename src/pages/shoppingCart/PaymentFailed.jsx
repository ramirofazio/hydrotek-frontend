import { useTranslation } from "react-i18next";

export function PaymentFailed({ err = " fondos insuficientes" }) {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("shopping-cart.payment-failed")}</h1>
      <p className="mx-auto w-fit mt-3">
        <i className="ri-close-circle-line text-6xl text-red-600"></i>
      </p>
      <h2 className="textGoldGradient mt-4 font-bold">Error: {err}</h2>
    </>
  );
}
