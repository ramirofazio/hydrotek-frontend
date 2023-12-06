import { Button } from "../../components/buttons";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Quantity } from "src/components";
import { addProduct } from "src/components/notifications";
import { actionsShoppingCart } from "src/redux/reducers";

export function ProductDescription({ productId, description, name, price, img, /*rating,*/ stock = 30 }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <article className="ml-2 grid place-items-start md:ml-0 md:place-items-center lg:my-auto lg:h-[60%] xl:gap-10">
      {/* <div className="flex w-full items-center justify-between">
        <Rating value={rating} />
        <p className="text-sm">{stock || "(25)"}</p>
      </div> */}
      <h1 className="text-2xl lg:text-3xl xl:underline xl:decoration-gold">{name || "Nombre del articulo"}</h1>
      <h2 className="textGoldGradient text-lg font-bold">
        {price.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        })}
      </h2>
      <Quantity price={price} stock={stock} productId={productId} />

      <Button
        text={t("common.buy-now")}
        className="mx-auto mt-2"
        onClick={() => {
          dispatch(actionsShoppingCart.addProudct({ productId, name, price }));
          addProduct({ name: name, img: img });
        }}
      />

      <h1 className="p-1 text-xs">{description}</h1>
    </article>
  );
}
