import { Link } from "react-router-dom";
import { Button } from "../buttons/Button";
import infoCardBorder from "assets/productBorderNoGradient.png";
import { useTranslation } from "react-i18next";

export function InfoCard({ text }) {
  const { t } = useTranslation();
  return (
    <div className="mx-auto mb-3 md:mb-10">
      <div className="relative mx-auto w-[70%] sm:w-[60%]">
        <img src={infoCardBorder} className="" />
        <div className="absolute inset-1 top-3 z-30  p-3 text-center md:flex md:flex-col md:gap-4 lg:gap-1 xs:top-8 xs:text-xl s:top-10">
          <h1 className="h-fit text-lg uppercase sm:text-4xl lg:text-2xl xs:text-2xl s:p-2 s:text-3xl">
            {text || "Cultivo sin tierra, crecimiento sin límites"}
          </h1>
          <Link to={`/products`} className="hidden md:inline">
            <Button classname="text-xs s:text-lg" text={t("common.see-products")} />
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-3 w-fit sm:mt-10 md:hidden xs:mt-5">
        <Link to={`/products`}>
          <Button classname="text-xs s:text-lg" text={t("common.see-products")} />
        </Link>
      </div>
    </div>
  );
}
