/* eslint-disable react/jsx-no-target-blank */
import { useTranslation } from "react-i18next";
import { logos } from "assets";
import { socialLinks } from "src/utils";
import { Link } from "react-router-dom";

const socialLinksIcons = [
  { href: socialLinks.facebook, icon: "facebook" },
  { href: socialLinks.whatsapp, icon: "whatsapp" },
  { href: socialLinks.instagram, icon: "instagram" },
  { href: socialLinks.mail, icon: "mail" },
];

const userLinks = [
  { href: "/edit-user", text: "footer.links-list.my-account" },
  { href: "/edit-user", text: "footer.links-list.edit" },
  { href: "/edit-user", text: "footer.links-list.change-password" },
  { href: "/edit-user", text: "footer.links-list.order-history" },
  { href: "/edit-user", text: "footer.links-list.order-track" },
];

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
            {socialLinksIcons.map(({ href, icon }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                className="goldGradient rounded-full p-3 px-4 transition ease-in-out hover:-translate-y-1  hover:scale-110 hover:opacity-60"
              >
                <i className={`ri-${icon}-fill text-2xl text-base`}></i>
              </a>
            ))}
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
          {userLinks.map(({ href, text }, index) => (
            <Link
              key={index}
              to={href}
              className="flex w-fit items-center pb-2 font-secondary text-xs text-white decoration-gold transition hover:cursor-pointer hover:underline"
            >
              {t(text)}
            </Link>
          ))}
        </div>
        <i
          className="ri-arrow-up-s-line goldGradient row-start-1 rounded-full p-3 !text-4xl text-base transition ease-in-out
        hover:-translate-y-2 hover:cursor-pointer lg:absolute lg:right-20 lg:row-start-auto"
          onClick={scrollUp}
        ></i>
      </section>
      <div className="w-full bg-gold py-2 text-center font-secondary text-xs text-white ">{t("footer.legal")}</div>
    </footer>
  );
};
