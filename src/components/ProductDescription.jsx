import { Rating } from "components";
import { useState } from "react";
import { Button } from "./buttons";
import { useTranslation } from "react-i18next";

export function ProductDescription({ name, price, rating, stock }) {
  const { t } = useTranslation();

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid place-items-center gap-4">
      <div className="flex w-full items-center justify-between">
        <Rating value={rating}/>
        <p className="text-sm">{stock || "(25)"}</p>
      </div>
      <div>
        <h1>{name || "nombre del articul Hydortek"}</h1>
        <h2 className="textGoldGradient ">{price || "$99.99"}</h2>
      </div>
      <div className="flex gap-6">
        <button
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 1 && true}
          className="goldGradient flex h-8  w-8 items-center justify-center rounded-full"
        >
          <p className="text-3xl">-</p>
        </button>
        <h1>{quantity}</h1>
        <button
          onClick={() => setQuantity(quantity + 1)}
          disabled={quantity === stock && true}
          className="goldGradient flex h-8  w-8 items-center justify-center rounded-full"
        >
          <p className="text-3xl">+</p>
        </button>
      </div>

      <Button text={t("common.buy-now")} className="mt-2" />

      <p className="p-1 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti corporis dolorem vero accusamus dicta, repellat adipisci maiores animi facilis harum asperiores optio nesciunt rerum deserunt aliquam necessitatibus odit labore quia!
      </p>
    </div>
  );
}
