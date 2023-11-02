import Atropos from "atropos/react";
import { products } from "assets";
import { Button, IconButtonWithBgGold } from "components/buttons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { WorkInProgressModal } from "../modals";
// import { AddToCart } from "src/pages/shoppingCart/AddToCart";

export function ProductCard({ imgUrl, name, price = 200, id, showBtn = true }) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`grid h-full w-fit p-4 md:w-[100%] xl:p-0`}>
      <Atropos highlight={false} shadow={false} className="h-full w-full cursor-pointer xl:pb-4">
        <div className="flex h-full min-h-[150px] w-full min-w-[150px] items-center justify-center bg-productBorderGradient bg-contain bg-clip-content bg-center bg-no-repeat">
          <img
            src={imgUrl || products.defaultOne}
            alt="foto del producto"
            className="m-10 w-[40%] md:m-20"
            data-atropos-offset="15"
          />
        </div>
      </Atropos>
      <div className={`${!showBtn && "hidden"} grid place-items-center gap-2 pb-12`}>
        <h1 className="text-center md:place-self-start">{name || "NOMBRE DEL PRODUCTO"}</h1>
        <h2 className="textGoldGradient mb-4 md:mb-2 md:place-self-start">{`${price}`}</h2>
        {showBtn && (
          <div className="flex  items-center gap-3 md:gap-8 md:place-self-start s:gap-5">
            {/* <Link to={`/productDetail/${id}`} className="md:place-self-start"> */}
            <Link className="md:place-self-start" onClick={() => setIsOpen(true)}>
              <Button text={t("common.buy-now")} pClassname={"font-primary"} />
            </Link>
            {/* <AddToCart price={price} productId={id}/> */}
          </div>
        )}
      </div>
      <WorkInProgressModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        text={
          <p className="text-center text-sm">
            Si quieres comprar {name}
            <br />
            <a
              href={`http://wa.me/5491170823697?text=Hola%21%20Vengo%20de%20la%20web.%20Me%20interes%C3%B3%20el%20producto%20${name}`}
            >
              <strong>comunicate con nosotros</strong>
              <IconButtonWithBgGold icon={`ri-whatsapp-line`} className={"mx-auto -mb-10 mt-4"} />
            </a>
          </p>
        }
      />
    </div>
  );
}
