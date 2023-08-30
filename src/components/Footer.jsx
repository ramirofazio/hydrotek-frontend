import React from "react";
import { useTranslation } from "react-i18next";
import { icons, logos } from "assets";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="h-full w-full border-t-8 border-gold">
      <section className="grid grid-cols-1 place-items-center gap-10 p-8 lg:grid-cols-3 lg:grid-rows-1 lg:gap-12">
        <div className="grid h-32 place-items-center sm:h-44 lg:pl-2 ">
          <img src={logos.hydText} className="col-span-1 w-full max-w-[800px] md:w-[70%] s:w-[80%]" />
          <div className="flex w-full justify-around md:w-[50%]  lg:w-[70%] lg:gap-5 lg:px-5">
            <div className="goldGradient flex h-12 w-12 items-center  justify-center rounded-full lg:w-20">
              <img src={icons.facebook} className="w-4" />
            </div>
            <div className="goldGradient flex h-12 w-12 items-center justify-center rounded-full lg:w-20">
              <img src={icons.instagram} className=" w-6" />
            </div>
            <div className="goldGradient flex h-12 w-12 items-center justify-center rounded-full lg:w-20">
              <img src={icons.wpp} className="h-6 w-6" />
            </div>
            <div className="goldGradient flex h-12 w-12 items-center justify-center rounded-full lg:w-20">
              <img src={icons.mail} className="w-7" />
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-2 my-6  lg:row-span-1 lg:h-full">
          <h1 className="textGoldGradient text-sm md:text-xl">{t("footer.who-we-are")}</h1>
          <p className="py-4 text-xs font-[200]  leading-5 tracking-widest md:w-[50%]  md:text-sm lg:w-full">
            {t("footer.who-we-are-body")}
          </p>
          <h1 className="textGoldGradient text-sm underline decoration-gold transition hover:cursor-pointer hover:opacity-[0.5]  md:text-xl">
            {t("footer.see-more")}
          </h1>
        </div>
        <div className="col-span-1 row-span-2 my-8 flex h-full w-full flex-col justify-around  lg:row-span-1 lg:justify-start">
          <h1 className="textGoldGradient mb-4 text-sm md:text-xl">{t("footer.links")}</h1>
          <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
            {t("footer.links-list.my-account")}
          </p>
          <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
            {t("footer.links-list.edit")}
          </p>
          <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
            {t("footer.links-list.change-password")}
          </p>
          <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
            {t("footer.links-list.order-history")}
          </p>
          <p className="flex items-center pb-2 decoration-gold transition hover:cursor-pointer hover:underline">
            {t("footer.links-list.order-track")}
          </p>
        </div>
        <ChevronUpIcon className="goldGradient row-start-1  h-14 rounded-full stroke-white p-3 text-white lg:absolute lg:right-20 lg:row-start-auto " />
      </section>

      <div className="w-full bg-gold py-2 text-center font-secondary text-xs text-white ">{t("footer.legal")}</div>
    </footer>
  );
};
