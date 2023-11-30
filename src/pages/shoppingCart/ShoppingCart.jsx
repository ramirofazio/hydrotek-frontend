import { CartArticleCard } from "src/components/cards";
import { useTranslation } from "react-i18next";
import { Input } from "src/components/inputs";
import { useSelector } from "react-redux";
import { Button } from "src/components/buttons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader, Modal } from "src/components";
import { useState } from "react";
import { PaymentOk } from "./PaymentOk";
import { PaymentFailed } from "./PaymentFailed";
import { error } from "src/components/notifications";
import getCheckout from "./checkouts";
import CheckoutForm from "./CheckoutForm";
import { PaymentInProcess } from "./PaymentInProcess";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");
  const transactionId = searchParams.get("transactionId");

  const { products, totalPrice } = useSelector((state) => state.shoppingCart);
  const {
    session: { dni, id },
  } = useSelector((state) => state.user);

  const [loader, setLoader] = useState(false);
  const [cleanProducts, setCleanProducts] = useState(null);
  const [paymentResponseModal, setPaymentResponseModal] = useState(true);
  const [checkoutFormModal, setCheckoutFormModal] = useState(false);

  const arrProducts = Object.values(products);

  async function payOrder() {
    if (arrProducts.length) {
      setLoader(true);
      const cleanProducts = arrProducts.map(({ quantity, productId }) => ({
        //? Acomodo los arrProducts como lo espera el BE
        qty: quantity,
        id: productId,
      }));
      getCheckout(id, dni, cleanProducts).then((res) => {
        if (res) {
          window.location.replace(res.data);
        } else {
          setLoader(false);
          setCheckoutFormModal(true);
          setCleanProducts(cleanProducts);
        }
      });
    } else {
      error("No hay productos en el carrito");
    }
  }

  return (
    <main className="content mx-auto mb-[6rem] mt-5  flex w-[92%] flex-col ">
      {loader && <Loader />}
      {checkoutFormModal && (
        <CheckoutForm
          isOpen={checkoutFormModal}
          onClose={() => setCheckoutFormModal(false)}
          cleanProducts={cleanProducts}
          setLoader={setLoader}
        />
      )}
      {status && (
        <Modal isOpen={paymentResponseModal} onClose={() => setPaymentResponseModal(false)}>
          {status === "200" && <PaymentOk transactionId={transactionId} />}
          {status === "2" && <PaymentInProcess transactionId={transactionId} />}
          {status === "0" && <PaymentFailed />}
        </Modal>
      )}
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
      <section className={`mt-10 lg:grid lg:grid-cols-5 lg:items-center`}>
        {/* <article className="flex  flex-col place-items-center gap-4 lg:col-span-2">
          <h1 className="mx-auto w-fit text-lg ">{t("shopping-cart.promotional-code")}</h1>
          <div className="w-[75%] lg:w-full">
            <Input type="text" placeholder="codigo" className="!p-1 !text-lg uppercase lg:!pl-6 " />
          </div>
          <button className="rounded-2xl bg-gold-gradient px-8 py-1">
            <h1 className="text-[0.95rem]">{t("common.add")}</h1>
          </button>
        </article> */}
        <article className="mx-auto my-10 w-[90%] rounded-lg border-2 border-gold bg-black px-5 py-8 md:px-[6rem] lg:col-span-5">
          <h1 className="mx-auto my-5 w-fit md:mx-0">{t("order.order-data")}</h1>
          <div className="flex flex-col gap-5  ">
            <div className="md:flex  md:justify-between md:border-b-[1px] md:border-dashed md:border-gold">
              <h1>{t("order.subtotal")}</h1>
              <strong className="textGoldGradient pointer-events-none border-0">{"$" + totalPrice || "--"}</strong>
            </div>
            <div className="md:flex  md:justify-between md:border-b-[1px] md:border-dashed md:border-gold">
              <h1>{t("order.total-price")}</h1>
              <strong className="textGoldGradient pointer-events-none border-0">{`$${totalPrice}`}</strong>
            </div>
          </div>

          <Button
            text={id ? t("order.pay-order") : "Continuar"}
            onClick={payOrder}
            className={"my-3 !mt-6 hidden !bg-gold text-xl hover:opacity-50 lg:inline"}
          />
        </article>

        <div className="mx-auto w-fit lg:hidden">
          <Button
            text={id ? t("order.pay-order") : "Continuar"}
            onClick={payOrder}
            className={"my-3 !mt-6 !bg-gold text-xl hover:opacity-50"}
          />
        </div>
      </section>
    </main>
  );
}
