import { t } from "i18next";
import { backgrounds, products } from "src/assets";
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
    <main className="mb-12 grid place-items-center gap-6 p-8">
      <section className="grid gap-6">
        <h1 className="text-center text-2xl sm:text-3xl">
          {t("common.know")} <br /> <strong className="pointer-events-none border-none">HYDROTEK</strong>
        </h1>
        <p className="sm:text-sm">{t("about.content")}</p>
        <p className="sm:text-sm">{t("about.content2")}</p>
        <div className="flex w-full justify-around p-4 sm:py-6">
          {socialLinksIcons.map(({ href, icon }, index) => (
            <a key={index} href={href} target="_blank">
              <IconButtonWithBgGold icon={`ri-${icon}-line`} />
            </a>
          ))}
        </div>
      </section>
      <section className="relative grid place-content-center place-items-center">
        <img src={products.defaultTwo} className="bottom-30 absolute inset-x-0 z-20 mx-auto w-[50%]" />
        <img src={backgrounds.signUpBgXl} className="w-full animate-pulse sm:w-[70%]" />
      </section>
    </main>
  );
}
