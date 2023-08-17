import Button from "./Button.jsx";
import ProductBorder from "../assets/productCardBorder.png";
import { Link } from "react-router-dom";

export default function ProductCard({ imgUrl, name, price, id, showBtn = false }) {
  return (
    <div className={`border-2 p-2 grid gap-2 ${showBtn && "place-items-center gap-3 p-3"}`}>
      <img src={imgUrl || ProductBorder} alt="imagen de producto" />
      <h1 className="">{name || "NOMBRE DEL PRODUCTO"}</h1>
      <h2 className="textGoldGradient mb-2">{price || "$99.99"}</h2>
      { showBtn &&
        <Link to={`/productDetail/${id}`}>
          <Button text="COMPRAR AHORA" />
        </Link>
      }
    </div>
  );
}
