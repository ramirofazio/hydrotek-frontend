import { CartArticleCard } from "src/components/cards";
import { useTranslation } from "react-i18next";
import { Input } from "src/components/inputs";
import { useSelector } from "react-redux";
import { Button } from "src/components/buttons";
import { useNavigate } from "react-router-dom";
//import { APIHydro } from "src/api";
import { Modal } from "src/components";
import { useState } from "react";
import { PaymentOk } from "./PaymentOk";
import { PaymentFailed } from "./PaymentFailed";

export default function ShoppingCart({ deliveryPrice = 50 }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { products, totalPrice } = useSelector((state) => state.shoppingCart);
  const arrProducts = Object.values(products);
  const [modal, setModal] = useState(false);
  const paymentState = "any";

  function payOrder() {
    //genera el chekout
    //const checkout = APIHydro.getCheckout()
    // redirecciona
  }

  return (
    <main className="content mx-auto mb-[6rem] mt-5  flex w-[92%] flex-col ">
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        {paymentState === "ok" && <PaymentOk />}
        {paymentState === "err" && <PaymentFailed />}
      </Modal>
      <header className=" border-b-2 border-gold p-4">
        <h1 className="mx-auto w-fit">{t("shopping-cart.your-cart")}</h1>
      </header>
      <section className="grid place-items-center gap-10 lg:place-items-start ">
        {arrProducts.length ? (
          arrProducts.map((a, i) => <CartArticleCard productId={a.productId} name={a.name} price={a.price} key={i} />)
        ) : (
          <div className="mt-10 flex w-[90%] flex-col gap-10 rounded-md border-2  p-8 text-center md:w-[50%] lg:max-w-[45%] lg:place-self-center s:w-[65%]">
            <h1 className="">{t("shopping-cart.no-products-on-cart")}</h1>
            <Button
              className="sm:mx-auto sm:w-[60%]"
              onClick={() => navigate("/products/0")}
              text={t("common.see-products")}
            />
          </div>
        )}
      </section>
      <section className={`mt-10 lg:grid lg:grid-cols-5 lg:items-center `}>
        <article className="flex  flex-col place-items-center gap-4 lg:col-span-2">
          <h1 className="mx-auto w-fit text-lg ">{t("shopping-cart.promotional-code")}</h1>
          <div className="w-[75%] lg:w-full">
            <Input type="text" placeholder="codigo" className="!p-1 !text-lg uppercase lg:!pl-6 " />
          </div>
          <button className="rounded-2xl bg-gold-gradient px-8 py-1">
            <h1 className="text-[0.95rem]">{t("common.add")}</h1>
          </button>
        </article>
        <article className="mx-auto my-10 w-[90%] rounded-lg border-2 border-gold bg-black px-5 py-8 md:px-[6rem] lg:col-span-3">
          <h1 className="mx-auto my-5 w-fit md:mx-0">{t("order.order-data")}</h1>
          <div className="flex flex-col gap-5  ">
            <div className="md:flex  md:justify-between md:border-b-[1px] md:border-dashed md:border-gold">
              <h1>{t("order.subtotal")}</h1>
              <h2 className=" textGoldGradient ">{"$" + totalPrice || "--"}</h2>
            </div>
            <div className="md:flex  md:justify-between md:border-b-[1px] md:border-dashed md:border-gold">
              <h1>{t("order.delivery")}</h1>
              <h2 className=" textGoldGradient ">{"$" + deliveryPrice || "--"}</h2>
            </div>
            <div className="md:flex  md:justify-between md:border-b-[1px] md:border-dashed md:border-gold">
              <h1>{t("order.total-price")}</h1>
              <h2 className=" textGoldGradient ">{`$${totalPrice + deliveryPrice}`}</h2>
            </div>
          </div>

          <button onClick={() => payOrder()} className="mt-10 hidden rounded-2xl bg-gold-gradient px-8 py-2 lg:inline">
            <h1 className="text-lg">{t("order.pay-order")}</h1>
          </button>
        </article>

        <div className="mx-auto w-fit lg:hidden">
          <button className="mx-auto inline rounded-2xl bg-gold-gradient px-8 py-2">
            <h1 className="w-fit text-lg">{t("order.pay-order")}</h1>
          </button>
        </div>
      </section>
    </main>
  );
}
