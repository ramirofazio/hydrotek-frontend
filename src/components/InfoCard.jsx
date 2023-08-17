import { Link } from "react-router-dom";
import Button from "./Button";

export default function InfoCard({ text }) {
  return (
    <div className="p-1">
      <div className="borderProduct lg:borderProductXl">
        <div className="lg:flex-column flex h-full items-center  text-center lg:flex-col lg:text-start lg:items-start lg:px-5 lg:py-2 lg:gap-5  ">
          <h1 className="uppercase lg:text-2xl ">{text || "Cultivo sin tierra, crecimiento sin límites"}</h1>
          <Link to={`/products`} className="hidden lg:inline">
            <Button classname="text-xs" text="VER PRODUCTOS" />
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
