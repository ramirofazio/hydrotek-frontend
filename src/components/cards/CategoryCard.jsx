import product from "../../assets/product.png";
import { Link } from "react-router-dom";

export function CategoryCard({ imgUrl = product, name = 'safe roots', id = 'au23d21we' }) {
  return (
    <Link to={`/products/${id}`} className="flex flex-col w-fit place-items-center p-2">
      <div className="p-4 rounded-full overflow-hidden  bg-blueGradient bg-cover bg-no-repeat border-4 border-gold aspect-square flex justify-center">
        <img src={imgUrl} alt="Imagen" className="w-[75%] object-contain" />
      </div>
      <h1 className="mt-2 border-2">{name}</h1>
    </Link>
  );
}
