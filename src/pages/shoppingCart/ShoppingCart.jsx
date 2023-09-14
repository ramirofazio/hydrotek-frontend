import { CartArticleCard } from "src/components/cards";
import { useTranslation } from "react-i18next";

export default function ShoppingCart() {
  const { t } = useTranslation();
  const arr = [1, 2, 3];
  return (
    <main className="content mx-auto mt-5 mb-14 flex w-[92%] flex-col  ">
      <div className=" border-b-2 border-gold p-4">
        <h1 className="mx-auto w-fit">{t("shopping-cart.your-cart")}</h1>
      </div>
      <article className="grid place-items-center gap-10 ">
        {arr.map((a, i) => (
          <CartArticleCard key={i} />
        ))}
      </article>
    </main>
  );
}
