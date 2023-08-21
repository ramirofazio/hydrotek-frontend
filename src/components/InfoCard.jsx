import { Link } from "react-router-dom";
import Button from "./Button";

export default function InfoCard({ text, showBtn = true }) {
  return (
    <div className="h-[50vh] w-full p-6   md:h-[60vh] ">
      <div className="grid h-full w-full bg-productBorderNoGradient bg-contain bg-no-repeat p-4 sm:bg-center md:place-items-center xl:place-items-start xl:bg-left">
        <div className="xl: flex h-[30vh] items-center sm:h-[45vh] md:w-[50%] md:flex-col xl:h-[50vh] xl:justify-center xl:px-14">
          <h1 className="h-full w-full pt-6 text-center  text-2xl uppercase sm:pt-20 sm:text-3xl md:h-fit md:pt-14 md:text-left md:text-4xl xl:pt-0">
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
}
