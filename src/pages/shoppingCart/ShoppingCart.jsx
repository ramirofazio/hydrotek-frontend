import { CartArticleCard } from "src/components/cards";
import { useTranslation } from "react-i18next";
import { Input } from "src/components/inputs";

export default function ShoppingCart() {
  const { t } = useTranslation();
  const arr = [1, 2, 3];
  return (
    <main className="content mx-auto mb-14 mt-5 flex w-[92%] flex-col  ">
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
            <Input type="text" placeholder="codigo" className="!text-lg !p-1 uppercase" />
          </div>
          <button className="bg-gold-gradient rounded-2xl py-1 px-8">
            <h1 className="text-[0.95rem]">{t("common.add")}</h1>
          </button>
        </div>
      </section>
    </main>
  );
}
