import Atropos from "atropos/react";
import { logos } from "assets";
import { Button } from "components/buttons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { backgrounds } from "src/assets";
import { AddToCart } from "src/pages/shoppingCart/AddToCart";

export function ProductCard({ imgUrl, name, price, id, showBtn = true }) {
  const { t } = useTranslation();

  return (
    <div className={`grid h-full w-fit p-4 md:w-[100%] xl:p-0`}>
      <Atropos highlight={false} shadow={false} className="h-full w-full cursor-pointer xl:pb-4">
        <div className="relative mx-auto grid aspect-square !h-[250px] place-content-center place-items-center overflow-hidden p-6">
          <img src={backgrounds.productBorderGradient} className="absolute" />
          <img src={imgUrl || logos.hydBlack} alt="foto del producto" className="scale-75" />
        </div>
      </Atropos>
      <div className={`${!showBtn && "hidden"} mx-auto grid place-items-center gap-2 pb-12 text-center`}>
        <h1 className="text-center text-sm md:place-self-start">{name || "NOMBRE DEL PRODUCTO"}</h1>
        <h2 className="textGoldGradient mb-4 md:mb-2 md:place-self-start">{price}</h2>
        {showBtn && (
          <div className="flex  items-center gap-3 md:gap-8 md:place-self-center s:gap-5">
            <Link to={`/productDetail/${id}`} className="md:place-self-start">
              <Button text={t("common.see")} pClassname={"font-primary"} />
            </Link>
            <AddToCart productImg={imgUrl || logos.hydBlack} productName={name} price={price} productId={id} />
          </div>
        )}
      </div>
    </div>
  );
}
