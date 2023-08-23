import { Link } from "react-router-dom";
import Button from "./Button";
import infoCardBorder from "../assets/productBorderNoGradient.png";

export default function InfoCard({ text }) {
  return (
    <div className="mx-auto mb-3 md:mb-10">
      <div className="relative mx-auto w-[70%] sm:w-[60%]">
        <img src={infoCardBorder} className="" />
        <div className="absolute z-30 inset-1 top-3  p-3 text-center xs:top-8 xs:text-xl s:top-10 md:flex md:flex-col md:gap-4 lg:gap-1">
          <h1 className="h-fit text-lg uppercase lg:text-2xl xs:text-2xl s:p-2 s:text-3xl sm:text-4xl">
            {text || "Cultivo sin tierra, crecimiento sin límites"}
          </h1>
          <Link to={`/products`} className="hidden md:inline">
            <Button classname="text-xs s:text-lg" text="VER PRODUCTOS" />
          </Link>
        </div>
      </div>
      <div className="mt-3 xs:mt-5 sm:mt-10 w-fit mx-auto md:hidden">
        <Link to={`/products`}>
          <Button classname="text-xs s:text-lg" text="VER PRODUCTOS" />
        </Link>
      </div>
    </div>
  );
}
