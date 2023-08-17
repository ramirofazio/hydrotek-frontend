import Button from "./Button.jsx";
//import Product from "../assets/product.png";
import ProductBorder from "../assets/productCardBorder.png";
import { Link } from "react-router-dom";

export default function ProductCard({ imgUrl, name, price, id, showBtn = false }) {
  return (
    <div className={`grid gap-2 border-2 p-2 ${showBtn && "place-items-center gap-3 p-3"}`}>
      <img src={ProductBorder || imgUrl} alt="borde del producto" className="block" />
      {  // a definir depende de como usemos las img de los productos
        //<img src={imgUrl || Product} alt="foto del producto" className="absolute"/>
      }
      <h1 className="">{name || "NOMBRE DEL PRODUCTO"}</h1>
      <h2 className="textGoldGradient mb-2">{price || "$99.99"}</h2>
      {showBtn && (
        <Link to={`/productDetail/${id}`}>
          <Button text="COMPRAR AHORA" />
        </Link>
      )}
    </div>
  );
}
