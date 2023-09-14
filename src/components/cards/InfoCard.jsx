import { Link } from "react-router-dom";
import { Button } from "components/buttons";
import { useTranslation } from "react-i18next";
import { backgrounds } from "src/assets";

export function InfoCard({ text }) {
  const { t } = useTranslation();
  return (
    <div className="mx-auto mb-10 md:mb-20 lg:mb-40">
      <div className="relative mx-auto w-[80%] xl:w-full">
        <img src={backgrounds.productBorder} className="" />
        <div className="absolute inset-1 z-30 flex items-center p-3  text-center md:flex-col md:justify-center md:gap-6 md:py-12 md:pl-14 xs:text-xl">
          <h1 className="h-fit text-lg uppercase sm:!text-4xl md:text-left  xl:!text-5xl xs:text-2xl s:text-3xl">
            {text || "Cultivo sin tierra, crecimiento sin límites"}
          </h1>
          <Link to={`/products`} className="hidden md:inline md:self-start">
            <Button className="xl:text-xl" text={t("common.see-products")} />
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-3 w-fit p-4 sm:mt-10 md:hidden xs:mt-5 font-primary">
        <Link to={`/products`}>
          <Button className="text-sm s:text-lg" text={t("common.see-products")} />
        </Link>
      </div>
    </div>
  );
}
