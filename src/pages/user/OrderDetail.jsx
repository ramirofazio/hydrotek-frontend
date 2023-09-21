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
    <main className="mx-8 grid gap-6 py-6">
      <IconButtonWithBgGold icon={"ri-arrow-left-s-line"} onClick={() => navigate(-1)} />
      <h1 className="text-center text-2xl leading-6">
        {t("order.resume")} DE LA <br />
        <span className="textGoldGradient"> ORDEN #{orderId}</span>
      </h1>
      <div className="border-b-2 border-gold" />
      <h1 className="textGoldGradient">{t("common.products")}</h1>
      {thisOrder.products.map(({ img, productName, qty, unitPrice }, index) => (
        <section key={index} className="grid gap-6">
          <RoundedGoldGradientBorder width={"w-32"}>
            <img src={img} className="aspect-square rounded-full object-contain" />
          </RoundedGoldGradientBorder>
          <h1>{productName}</h1>
          <h1>
            <span className="textGoldGradient">{t("common.qty")}</span>
            <br />
            {qty}
          </h1>
          <h1>
            <span className="textGoldGradient">{t("common.unitPrice")}</span>
            <br />$ {unitPrice.toLocaleString()}
          </h1>
          <h1>
            <span className="textGoldGradient">{t("common.total")}</span>
            <br />$ {(qty * unitPrice).toLocaleString()}
          </h1>
          <div className="border-b-2 border-gold" />
          <h1 className="mx-10 text-center text-2xl leading-6">{t("order.comment")}</h1>
          <textarea
            className="!h-80 rounded-xl border-4 border-gold bg-black p-4 text-sm text-white placeholder:text-white focus:border-gold/50 focus:outline-none"
            placeholder={t("order.writeYourReview")}
          />
          <h1>{t("order.review")}</h1>
          <Rating size={"text-3xl"} />
          <Button text={t("order.sendComment")} className={"goldGradient my-8 border-none py-4 text-2xl"} />
        </section>
      ))}
    </main>
  );
}
