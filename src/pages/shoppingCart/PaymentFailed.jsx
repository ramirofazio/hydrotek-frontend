import { useTranslation } from "react-i18next";

export function PaymentFailed() {
  const { t } = useTranslation();

  return (
    <main className="grid gap-6 text-center">
      <h1>{t("shopping-cart.payment-failed")}</h1>
      <p className="mx-auto w-fit">
        <i className="ri-close-circle-line text-6xl text-red-600"></i>
      </p>
      <h2 className="textGoldGradient font-bold">por favor repite el proceso</h2>
    </main>
  );
}
