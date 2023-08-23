import Button from "./Button.jsx";
import product from "../assets/product.png";
import { Link } from "react-router-dom";
import Atropos from "atropos/react";

export default function ProductCard({ imgUrl, name, price, id, showBtn = true }) {
  return (
    <div className={`grid h-full w-fit md:w-[100%]`}>
      <Atropos highlight={false} shadow={false} className="h-full w-full cursor-pointer ">
        <div className="flex h-full min-h-[150px] w-full min-w-[150px] items-center justify-center bg-productBorderGradient bg-contain  bg-clip-content bg-center bg-no-repeat">
          <img
            src={imgUrl || product}
            alt="foto del producto"
            className="w-[40%] xl:w-[30%]"
            data-atropos-offset="15"
          />
        </div>
      </Atropos>
      <div className="outline grid place-items-center pb-12 gap-1">
        <h1 className="text-center">{name || "NOMBRE DEL PRODUCTO"}</h1>
        <h2 className="textGoldGradient">{price || "$99.99"}</h2>
        {showBtn && (
          <Link to={`/productDetail/${id}`}>
            <Button text="COMPRAR AHORA" />
          </Link>
        )}
      </div>
    </div>
  );
}
