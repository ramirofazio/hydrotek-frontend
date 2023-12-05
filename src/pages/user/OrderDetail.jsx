import { t } from "i18next";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { logos } from "src/assets";
import { RoundedGoldGradientBorder } from "src/components/border";
import { IconButtonWithBgGold } from "src/components/buttons";

export function OrderDetail() {
  const navigate = useNavigate();
  const { fresaId, date, totalPrice, status, products } = useLoaderData();

  useEffect(() => {
    window.scrollBy(0, -window.innerHeight);
  }, [window]);

  return (
    <main className="mx-8 grid gap-6 py-6 lg:mx-10 xl:mx-20">
      <IconButtonWithBgGold icon={"ri-arrow-left-s-line"} onClick={() => navigate(-1)} />
      <div className="flex flex-col gap-10 lg:flex-row">
        <h1>
          {t("order.resume")} DE LA ORDEN
          <br className="lg:hidden" />
          <strong className="pointer-events-none text-sm lg:ml-2 lg:text-xl">{fresaId}</strong>
        </h1>
        <h1>
          FECHA DE COMPRA <br className="lg:hidden" />
          <strong className="pointer-events-none text-sm lg:text-xl">{new Date(date).toLocaleDateString()}</strong>
        </h1>
        <h1>
          ESTADO <br className="lg:hidden" />
          <strong
            className={`pointer-events-none text-sm lg:text-xl ${status !== 200 ? "text-red-500" : "textGoldGradient"}`}
          >
            {status === 200 ? "pagado" : "a pagar"}
          </strong>
        </h1>
      </div>
      <div className="border-b-2 border-gold" />
      <div className="lg:flex lg:justify-between">
        <h1 className="textGoldGradient lg:flex-1">{t("common.products")}</h1>
        <h1 className="textGoldGradient hidden lg:mx-10 lg:inline lg:w-72 lg:text-right">{t("common.qty")}</h1>
        <h1 className="textGoldGradient hidden lg:mx-10 lg:inline lg:w-72 lg:text-right">{t("common.unitPrice")}</h1>
        <h1 className="textGoldGradient hidden lg:mx-10 lg:inline lg:w-72 lg:text-right">{t("common.total")}</h1>
      </div>
      {products.map(({ product: { images, name }, quantity, price }, index) => (
        <>
          <section key={index} className="grid gap-4 lg:flex lg:items-center lg:justify-between">
            <RoundedGoldGradientBorder width={"w-32"}>
              <img src={images[0]?.path || logos.hydBlack} className="aspect-square rounded-full object-contain" />
            </RoundedGoldGradientBorder>
            <h1 className="lg:flex-1">{name}</h1>
            <h1 className="lg:mx-8 lg:w-72 lg:text-right">
              <span className="textGoldGradient lg:hidden ">{t("common.qty")}</span>
              <br className="lg:hidden" />
              {quantity}
            </h1>
            <h1 className="lg:mx-8 lg:w-72 lg:text-right">
              <span className="textGoldGradient lg:hidden">{t("common.unitPrice")}</span>
              <br className="lg:hidden" />
              {price.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </h1>
            <h1 className="lg:mx-8 lg:w-72  lg:text-right">
              <span className="textGoldGradient lg:hidden">{t("common.total")}</span>
              <br className="lg:hidden" />
              {totalPrice.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </h1>
            <div className="border-b-2 border-gold" />
            {/* <h1 className="mx-10 text-center text-2xl leading-6">{t("order.comment")}</h1>
          <textarea
            className="!h-80 rounded-xl border-4 border-gold bg-black p-4 text-sm text-white placeholder:text-white focus:border-gold/50 focus:outline-none"
            placeholder={t("order.writeYourReview")}
          />
          <h1>{t("order.review")}</h1>
          <Rating size={"text-3xl"} />
          <Button text={t("order.sendComment")} className={"goldGradient my-8 border-none py-4 text-2xl"} /> */}
          </section>
          <div className="hidden border-b-2 border-gold lg:inline" />
        </>
      ))}
    </main>
  );
}
