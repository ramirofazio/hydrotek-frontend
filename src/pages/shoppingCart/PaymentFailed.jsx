import { useTranslation } from "react-i18next";

export function PaymentFailed() {
  const { t } = useTranslation();

  return (
    <main className="grid gap-6 text-center">
      <h1>{t("shopping-cart.payment-failed")}</h1>
      <p className="mx-auto w-fit">
        <i className="ri-close-circle-line text-6xl text-red-600"></i>
      </p>
      <h2 className="textGoldGradient font-bold">
        Estamos experimentando dificultades con nuestro proveedor de pagos en este momento. Por favor, contáctanos por
        WhatsApp para completar tu pedido.
      </h2>
      <i
        className="ri-whatsapp-line icons textGoldGradient mx-auto w-fit animate-pulse text-6xl hover:text-green-600"
        onClick={() => window.open(`https://wa.me/5491170823697`, "_blank")}
      />
    </main>
  );
}
