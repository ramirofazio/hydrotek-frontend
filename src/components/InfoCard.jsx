import { Link } from "react-router-dom";
import Button from "./Button";
import infoCardBorder from "../assets/productBorderNoGradient.png";

export default function InfoCard({ text }) {
  return (
    <div className="mx-auto border-blue mb-3 md:mb-10">
      <div className="relative mx-auto w-[70%] sm:w-[60%]">
        <img src={infoCardBorder} className="" />
        <div className="absolute z-30 inset-1 top-3 border-2 p-3 text-center xs:top-8 xs:text-xl s:top-10 md:flex md:flex-col md:gap-4">
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
{
  /* <div className="bg-productBorderNoGradient bg-auto bg-no-repeat ">
        <div className="lg:flex-column flex h-full items-center  border-red-400  bg-no-repeat  text-center lg:flex-col lg:items-start lg:gap-5 lg:px-5 lg:py-2 lg:text-start">
          <h1 className="uppercase lg:text-2xl ">{text || "Cultivo sin tierra, crecimiento sin límites"}</h1>
          <Link to={`/products`} className="hidden lg:inline">
            <Button classname="text-xs" text="VER PRODUCTOS" />
          </Link>
        </div> */
}

{
  /* <div className=" mx-auto w-fit">
        <Link to={`/products`} className="lg:hidden">
          <Button classname="mt-9 " text="VER PRODUCTOS" />
        </Link>
      </div> */
}
/* export default function InfoCard({ text, showBtn = true }) {
  return (
    <div className="h-[50vh] w-fit p-8 md:h-[60vh] 2xl:px-24 border-2">
      <div className="grid border-2 h-full w-full bg-productBorderNoGradient bg-contain bg-no-repeat p-4 sm:bg-center md:place-items-center xl:place-items-start xl:bg-left">
        <div className="flex h-[30vh] items-center sm:h-[45vh] md:w-[50%] md:flex-col xl:h-[50vh] xl:w-[500px] xl:justify-center xl:px-14">
          <h1 className="h-full w-full pt-6 text-center text-xl  uppercase  sm:pt-20 sm:text-3xl md:h-fit md:pt-14 md:text-left md:text-4xl xl:pt-0">
            {text || "Cultivo sin tierra, crecimiento sin límites"}
          </h1>
          <Link to={`/products`} className={`${showBtn ? "hidden self-start md:mt-10 md:inline" : "hidden"}`}>
            <Button text="COMPRAR AHORA" />
          </Link>
        </div>
        <Link to={`/products`} className={`${showBtn ? "mx-auto w-fit  md:mt-14 md:hidden" : "hidden"}`}>
          <Button text="COMPRAR AHORA" />
        </Link>
      </div>
    </div>
  );
} */
