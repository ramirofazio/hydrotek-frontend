import Button from "./Button.jsx";
import product from "../assets/product.png";
import { Link } from "react-router-dom";

export default function ProductCard({ imgUrl, name, price, id, showBtn = true }) {
  return (
    <div className={`grid h-full w-[80%] `}>
      <div className="row-span-5 flex w-full items-center justify-center bg-productBorder  bg-contain bg-clip-content bg-center bg-no-repeat">
        <img src={imgUrl || product} alt="foto del producto" className="w-[40%]" />
      </div>
      <div>
        <h1 className="">{name || "NOMBRE DEL PRODUCTO"}</h1>
        <h2 className="textGoldGradient mb-8 mt-2">{price || "$99.99"}</h2>
        {showBtn && (
          <Link to={`/productDetail/${id}`}>
            <Button text="COMPRAR AHORA" />
          </Link>
        )}
      </div>
    </div>
  );
}
