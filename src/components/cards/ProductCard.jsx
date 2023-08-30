import Atropos from "atropos/react";
import { defaultProduct } from "assets";
import { Button } from "components/buttons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function ProductCard({ imgUrl, name, price, id = 1, showBtn = true }) {
  const { t } = useTranslation();
  return (
    <div className={`grid h-full w-fit p-4 md:w-[100%] xl:p-0`}>
      <Atropos highlight={false} shadow={false} className="h-full w-full cursor-pointer">
        <div className="flex h-full min-h-[150px] w-full min-w-[150px] items-center justify-center bg-productBorderGradient bg-contain bg-clip-content bg-center bg-no-repeat">
          <img
            src={imgUrl || defaultProduct}
            alt="foto del producto"
            className="m-10 w-[40%] md:m-20"
            data-atropos-offset="15"
          />
        </div>
      </Atropos>
      <div className={`${!showBtn && "hidden"} grid place-items-center gap-2 pb-12`}>
        <h1 className="text-center md:place-self-start">{name || "NOMBRE DEL PRODUCTO"}</h1>
        <h2 className="textGoldGradient mb-4 md:mb-2 md:place-self-start">{price || "$99.99"}</h2>
        {showBtn && (
          <Link to={`/productDetail/${id}`} className="md:place-self-start">
            <Button text={t("common.buy-now")} />
          </Link>
        )}
      </div>
    </div>
  );
}
