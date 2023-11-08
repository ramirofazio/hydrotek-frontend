import { t } from "i18next";
import { backgrounds, borders, products } from "src/assets";
import { IconButtonWithBgGold } from "src/components/buttons";
import { socialLinks } from "src/utils";

const socialLinksIcons = [
  { href: socialLinks.facebook, icon: "facebook" },
  { href: socialLinks.whatsapp, icon: "whatsapp" },
  { href: socialLinks.instagram, icon: "instagram" },
  { href: socialLinks.mail, icon: "mail" },
];

export function AboutUs() {
  return (
    <main className="mb-12 grid place-items-center  p-8 xl:mb-0 xl:flex xl:p-20 xl:pt-0">
      <section className="grid gap-4 text-justify xl:relative xl:flex-1 xl:p-20 xl:pb-10">
        <img src={borders.profile} className="absolute left-0 top-0 hidden w-72 animate-pulse xl:inline" />
        <h1 className="text-center text-2xl sm:text-3xl xl:text-start xl:text-4xl">
          {t("common.know")} <br className="lg:hidden" />
          <strong className="pointer-events-none border-none">HYDROTEK</strong>
        </h1>
        <p className="sm:text-sm xl:text-sm">{t("about.content")}</p>
        <p className="sm:text-sm xl:text-sm">{t("about.content2")}</p>
        <p className="sm:text-sm xl:text-sm">{t("about.content3")}</p>
        <p className="sm:text-sm xl:text-sm">{t("about.content4")}</p>
        <p className="sm:text-sm xl:text-sm">{t("about.content5")}</p>
        <div className="flex w-full justify-around p-4 sm:py-6 lg:justify-center lg:gap-10 xl:justify-start xl:gap-4">
          {socialLinksIcons.map(({ href, icon }, index) => (
            <a key={index} href={href} target="_blank" rel="noreferrer">
              <IconButtonWithBgGold icon={`ri-${icon}-line`} />
            </a>
          ))}
        </div>
        <img
          src={borders.profile}
          className="absolute bottom-0 right-0 hidden w-72 rotate-180 animate-pulse xl:inline"
        />
      </section>
      <section className="relative grid place-content-center place-items-center xl:flex-1">
        <img src={products.aboutUs} className="bottom-30 absolute inset-x-0 z-20 mx-auto" />
        <img src={backgrounds.signUpBgXl} className="w-full animate-pulse xl:animate-none" />
      </section>
    </main>
  );
}
