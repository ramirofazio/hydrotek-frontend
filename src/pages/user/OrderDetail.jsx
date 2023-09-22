import { t } from "i18next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Rating, RoundedGoldGradientBorder } from "src/components";
import { Button, IconButtonWithBgGold } from "src/components/buttons";

export function OrderDetail() {
  const navigate = useNavigate();
  const orders = useSelector((s) => s.user.profile.orders);
  let { orderId } = useParams();
  const thisOrder = orders.find((o) => o.id === orderId);

  useEffect(() => {
    window.scrollBy(0, -window.innerHeight);
  }, [window]);

  return (
    <main className="mx-8 grid gap-6 py-6 lg:mx-10 xl:mx-20">
      <IconButtonWithBgGold icon={"ri-arrow-left-s-line"} onClick={() => navigate(-1)} />
      <h1 className="text-center text-2xl leading-6 lg:text-left">
        {t("order.resume")} DE LA <br className="lg:hidden" />
        <span className="textGoldGradient"> ORDEN #{orderId}</span>
      </h1>
      <div className="border-b-2 border-gold" />
      <div className="lg:flex lg:justify-between">
        <h1 className="textGoldGradient lg:flex-1">{t("common.products")}</h1>
        <h1 className="textGoldGradient hidden lg:mx-10 lg:inline lg:w-72 lg:text-right">{t("common.qty")}</h1>
        <h1 className="textGoldGradient hidden lg:mx-10 lg:inline lg:w-72 lg:text-right">{t("common.unitPrice")}</h1>
        <h1 className="textGoldGradient hidden lg:mx-10 lg:inline lg:w-72 lg:text-right">{t("common.total")}</h1>
      </div>
      {thisOrder.products.map(({ img, productName, qty, unitPrice }, index) => (
        <>
          <section key={index} className="grid gap-4 lg:flex lg:items-center lg:justify-between">
            <RoundedGoldGradientBorder width={"w-32"}>
              <img src={img} className="aspect-square rounded-full object-contain" />
            </RoundedGoldGradientBorder>
            <h1 className="lg:flex-1">{productName}</h1>
            <h1 className="lg:mx-8 lg:w-72 lg:text-right">
              <span className="textGoldGradient lg:hidden ">{t("common.qty")}</span>
              <br className="lg:hidden" />
              {qty}
            </h1>
            <h1 className="lg:mx-8 lg:w-72 lg:text-right">
              <span className="textGoldGradient lg:hidden">{t("common.unitPrice")}</span>
              <br className="lg:hidden" />$ {unitPrice.toLocaleString()}
            </h1>
            <h1 className="lg:mx-8 lg:w-72  lg:text-right">
              <span className="textGoldGradient lg:hidden">{t("common.total")}</span>
              <br className="lg:hidden" />$ {(qty * unitPrice).toLocaleString()}
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
