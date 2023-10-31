import { Rating } from "./index";
import { Button } from "../../components/buttons";
import { useTranslation } from "react-i18next";
import { Quantity } from "src/components";

export function ProductDescription({ productId, description, name, price, rating, stock = 10 }) {
  const { t } = useTranslation();

  return (
    <article className="grid place-items-center gap-4 md:items-center md:justify-items-start md:gap-1">
      <div className="flex w-full items-center justify-between">
        <Rating value={rating} />
        <p className="text-sm">{stock || "(25)"}</p>
      </div>
      <div>
        <h1>{name || "nombre del articul Hydortek"}</h1>
        <h2 className="textGoldGradient ">{"$" + price || "$99.99"}</h2>
      </div>
      <div>
        <Quantity className="" price={price} stock={stock} productId={productId} />
      </div>

      <Button text={t("common.buy-now")} className="mt-2" />

      <h1 className="p-1 text-xs">
        {description || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti corporis dolorem vero accusamus dicta, repellat adipisci maiores animi facilis harum asperiores optio nesciunt rerum deserunt aliquam necessitatibus odit labore quia!"}
      </h1>
    </article>
  );
}
