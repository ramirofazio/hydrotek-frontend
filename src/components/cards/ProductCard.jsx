import Atropos from "atropos/react";
import product from "assets/product.png";
import { Button } from "../buttons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function ProductCard({ imgUrl, name, price, id, showBtn = true }) {
  const { t } = useTranslation();
  return (
    <div className={`grid h-full place-items-center  w-[80%]`}>
      <Atropos highlight={false} shadow={false} className="cursor-pointer  w-full">
        <div className="flex h-full min-h-[150px]  min-w-[150px] items-center justify-center bg-productBorderGradient bg-contain  bg-clip-content bg-center bg-no-repeat">
          <img
            src={imgUrl || product}
            alt="foto del producto"
            className="w-[45%] md:w-[40%] lg:w-[45%] xl:w-[60%] object-contain"
            data-atropos-offset="15"
          />
        </div>
      </Atropos>
      <div className=" grid place-items-center gap-1 pb-12">
        <h1 className="text-center">{name || "NOMBRE DEL PRODUCTO"}</h1>
        <h2 className="textGoldGradient">{price || "$99.99"}</h2>
        {showBtn && (
          <Link to={`/productDetail/${id}`}>
            <Button text={t("common.buy-now")} />
          </Link>
        )}
      </div>
    </div>
  );
}
