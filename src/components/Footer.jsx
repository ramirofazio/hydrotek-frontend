/* eslint-disable react/jsx-no-target-blank */
import { useTranslation } from "react-i18next";
import { icons, logos } from "assets";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { socialLinks } from "src/utils";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useTranslation();

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="h-full w-full border-t-8 border-gold">
      <section className="grid grid-cols-1 place-items-center gap-10 p-8 lg:grid-cols-3 lg:grid-rows-1 lg:gap-12">
        <div className="grid h-32 place-items-center sm:h-44 lg:pl-2 ">
          <img src={logos.hydText} className="col-span-1 w-full max-w-[800px] md:w-[70%] s:w-[80%]" />
          <div className="flex w-full justify-around md:w-[50%]  lg:w-[70%] lg:gap-5 lg:px-5">
            <a
              href={socialLinks.facebook}
              target="_blank"
              className="goldGradient flex h-12 w-12 items-center   justify-center rounded-full transition ease-in-out hover:-translate-y-1  hover:scale-110 hover:opacity-60 lg:w-20"
            >
              <img src={icons.facebook} className="w-4" />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              className="goldGradient flex h-12 w-12 items-center justify-center rounded-full transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:opacity-60 lg:w-20"
            >
              <img src={icons.instagram} className=" w-6" />
            </a>
            <a
              href={socialLinks.wpp}
              target="_blank"
              className="goldGradient flex h-12 w-12 items-center justify-center rounded-full transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:opacity-60 lg:w-20"
            >
              <img src={icons.wpp} className="h-6 w-6" />
            </a>
            <a
              href={socialLinks.mail}
              target="_blank"
              className="goldGradient flex h-12 w-12 items-center justify-center rounded-full transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:opacity-60 lg:w-20"
            >
              <img src={icons.mail} className="w-7" />
            </a>
          </div>
        </div>
        <div className="col-span-1 row-span-2 my-6  lg:row-span-1 lg:h-full">
          <h1 className="textGoldGradient text-sm md:text-xl">{t("footer.who-we-are")}</h1>
          <p className="py-4 text-xs font-[200]  leading-5 tracking-widest md:w-[50%]  md:text-sm lg:w-full">
            {t("footer.who-we-are-body")}
          </p>
          <Link
            to="/about_us"
            className="textGoldGradient font-primary text-sm uppercase underline decoration-gold transition hover:cursor-pointer hover:brightness-125  md:text-xl"
          >
            {t("footer.see-more")}
          </Link>
        </div>
        <div className="col-span-1 row-span-2 my-8 flex h-full w-full flex-col justify-around  lg:row-span-1 lg:justify-start">
          <h1 className="textGoldGradient mb-4 text-sm md:text-xl">{t("footer.links")}</h1>
          <Link
            to="/edit_user"
            className="flex w-fit items-center pb-2 font-secondary text-xs text-white decoration-gold transition hover:cursor-pointer hover:underline"
          >
            {t("footer.links-list.my-account")}
          </Link>
          <Link
            to="/edit_user"
            className="flex w-fit items-center pb-2 font-secondary text-xs text-white decoration-gold transition hover:cursor-pointer hover:underline"
          >
            {t("footer.links-list.edit")}
          </Link>
          <Link
            to="/edit_user"
            className="flex w-fit items-center pb-2 font-secondary text-xs text-white decoration-gold transition hover:cursor-pointer hover:underline"
          >
            {t("footer.links-list.change-password")}
          </Link>
          <Link
            to="/edit_user"
            className="flex w-fit items-center pb-2 font-secondary text-xs text-white decoration-gold transition hover:cursor-pointer hover:underline"
          >
            {t("footer.links-list.order-history")}
          </Link>
          <Link
            to="/edit_user"
            className=" flex w-fit items-center pb-2 font-secondary text-xs text-white decoration-gold transition hover:cursor-pointer hover:underline"
          >
            {t("footer.links-list.order-track")}
          </Link>
        </div>
        <ChevronUpIcon
          onClick={scrollUp}
          className="goldGradient row-start-1 h-14 rounded-full stroke-white p-3 text-white  transition ease-in-out hover:-translate-y-2 hover:cursor-pointer lg:absolute lg:right-20 lg:row-start-auto "
        />
      </section>

      <div className="w-full bg-gold py-2 text-center font-secondary text-xs text-white ">{t("footer.legal")}</div>
    </footer>
  );
};
