import { CartArticleCard } from "src/components/cards";
import { useTranslation } from "react-i18next";
import { Input } from "src/components/inputs";

export default function ShoppingCart({ subtotal, totalPrice, deliveryPrice }) {
  const { t } = useTranslation();
  const arr = [1, 2, 3];
  return (
    <main className="content mx-auto mb-[6rem] mt-5  flex w-[92%] flex-col ">
      <header className=" border-b-2 border-gold p-4">
        <h1 className="mx-auto w-fit">{t("shopping-cart.your-cart")}</h1>
      </header>
      <section className="grid place-items-center gap-10 lg:place-items-start ">
        {arr.map((a, i) => (
          <CartArticleCard key={i} />
        ))}
      </section>
      <section className=" mt-10 lg:grid lg:grid-cols-5 lg:items-center">
        <article className="flex  flex-col place-items-center gap-4 lg:col-span-2">
          <h1 className="mx-auto w-fit text-lg ">{t("shopping-cart.promotional-code")}</h1>
          <div className="w-[75%] lg:w-full">
            <Input type="text" placeholder="codigo" className="!p-1 lg:!pl-6 !text-lg uppercase " />
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
              <h2 className=" textGoldGradient ">{subtotal || "$99.99"}</h2>
            </div>
            <div className="md:flex  md:justify-between md:border-b-[1px] md:border-dashed md:border-gold">
              <h1>{t("order.delivery")}</h1>
              <h2 className=" textGoldGradient ">{deliveryPrice || "$99.99"}</h2>
            </div>
            <div className="md:flex  md:justify-between md:border-b-[1px] md:border-dashed md:border-gold">
              <h1>{t("order.total-price")}</h1>
              <h2 className=" textGoldGradient ">{totalPrice || "$99.99"}</h2>
            </div>
          </div>

          <button className="mt-10 hidden rounded-2xl bg-gold-gradient px-8 py-2 lg:inline">
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
