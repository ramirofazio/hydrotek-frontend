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
    <article className="grid place-items-center gap-4 md:items-center md:justify-items-start md:gap-1">
      {/* <div className="flex w-full items-center justify-between">
        <Rating value={rating} />
        <p className="text-sm">{stock || "(25)"}</p>
      </div> */}
      <div>
        <h1>{name || "Nombre del articulo"}</h1>
        <h2 className="textGoldGradient ">
          {price.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </h2>
      </div>
      <div>
        <Quantity price={price} stock={stock} productId={productId} />
      </div>

      <Button
        text={t("common.buy-now")}
        className="mt-2"
        onClick={() => {
          dispatch(actionsShoppingCart.addProudct({ productId, name, price }));
          addProduct({ name: name, img: img });
        }}
      />

      <h1 className="p-1 text-xs">{description}</h1>
    </article>
  );
}
