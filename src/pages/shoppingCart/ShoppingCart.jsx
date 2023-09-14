import { CartArticleCard } from "src/components/cards";
import { useTranslation } from "react-i18next";
import { Input } from "src/components/inputs";

export default function ShoppingCart({ subtotal, totalPrice, deliveryPrice }) {
  const { t } = useTranslation();
  const arr = [1, 2, 3];
  return (
    <main className="content mx-auto mb-14 mt-5 flex w-[92%] flex-col ">
      <div className=" border-b-2 border-gold p-4">
        <h1 className="mx-auto w-fit">{t("shopping-cart.your-cart")}</h1>
      </div>
      <section className="grid place-items-center gap-10 ">
        {arr.map((a, i) => (
          <CartArticleCard key={i} />
        ))}
      </section>
      <section className="mt-10">
        <div className="flex flex-col place-items-center gap-4">
          <h1 className="mx-auto w-fit text-lg ">{t("shopping-cart.promotional-code")}</h1>
          <div className=" w-[75%]">
            <Input type="text" placeholder="codigo" className="!p-1 !text-lg uppercase" />
          </div>
          <button className="rounded-2xl bg-gold-gradient px-8 py-1">
            <h1 className="text-[0.95rem]">{t("common.add")}</h1>
          </button>
        </div>
        <div className="px-5 py-8 mx-auto mt-10 w-[95%] rounded-lg border-2 border-gold bg-black">
          <h1 className="my-5 mx-auto w-fit">{t("order.order-data")}</h1>
          <div className="flex flex-col gap-4">
            <div>
              <h1>{t("order.subtotal")}</h1>
              <h2 className=" textGoldGradient ">{subtotal || "$99.99"}</h2>
            </div>
            <div>
              <h1>{t("order.delivery")}</h1>
              <h2 className=" textGoldGradient ">{deliveryPrice || "$99.99"}</h2>
            </div>
            <div>
              <h1>{t("order.total-price")}</h1>
              <h2 className=" textGoldGradient ">{totalPrice || "$99.99"}</h2>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
