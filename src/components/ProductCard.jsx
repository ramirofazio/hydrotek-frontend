import Button from "./Button.jsx";
import ProductBorder from "../assets/productCardBorder.png";
import { Link } from "react-router-dom";

export default function ProducCard({ imgUrl, name, price, id }) {
  return (
    <div className="grid place-items-center p-3 gap-3">
      <img src={imgUrl || ProductBorder} alt="imagen de producto" />
      <h1 className="">{name || "NOMBRE DEL PRODUCTO"}</h1>
      <h2 className="textGoldGradient mb-2">{price || "$99.99"}</h2>
      <Link to={`/productDetail/${id}`}>
        <Button text="COMPRAR AHORA" />
      </Link>
    </div>
  );
}
