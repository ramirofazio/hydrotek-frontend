import { Link } from "react-router-dom";
import Button from "./Button";
import product from "../assets/product.png";

export default function InfoCard({ text, showBtn = false }) {
  return (
    <div className="p-1">
      <div className="borderProduct ">
        <div className="flex h-full items-center text-center border-2">
          <h1 className="uppercase">{text || "Cultivo sin tierra, crecimiento sin límites"}</h1>
          <Link to={`/products`} className="hidden lg:inline">
            <Button classname="" text="VER PRODUCTOS" />
          </Link>
        </div>
      </div>
      <div className="mx-auto w-fit">
        <Link to={`/products`} className="lg:hidden">
          <Button classname="mt-9 " text="VER PRODUCTOS" />
        </Link>
      </div>
    </div>
  );
}

{
  /* <div className={`grid gap-2 border-2 p-2`}>
      <img src={ProductBorder} alt="borde del producto" className="block" />
      <h1 className="">{text || "TITULO O INFO"}</h1>
      {showBtn && (
        <Link to={`/products}`}>
          <Button text="VER PRODUCTOS" />
        </Link>
      )}
    </div> */
}
