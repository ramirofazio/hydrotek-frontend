import { defaultProduct } from "assets";
import { Link } from "react-router-dom";

export function CategoryCard({ img = defaultProduct, name = "safe roots", id = "au23d21we" }) {
  return (
    <Link to={`/products/${id}`} className="mb-10 flex w-fit flex-col place-items-center p-2">
      <div className="flex aspect-square justify-center  overflow-hidden rounded-full border-4 border-gold bg-blueGradient bg-cover bg-no-repeat p-4">
        <img src={img} alt="Imagen" className="w-[75%] object-contain" />
      </div>
      <h1 className="mt-2">{name}</h1>
    </Link>
  );
}
