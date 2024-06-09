import { t } from "i18next";
import { backgrounds, borders, products } from "src/assets";

export function AboutUs() {
  document.title = "Sobre nosotros - Hydrotek";

  return (
    <main className="grid place-items-center p-8 lg:grid-cols-2 xl:p-20">
      <section className="relative grid gap-4 text-justify xl:p-20">
        <img
          src={borders.aboutUs}
          className="absolute -left-10 -top-10 hidden w-[300px] rotate-90 animate-pulse xl:inline"
        />
        <h1 className="text-center text-2xl sm:text-3xl xl:text-start xl:text-4xl">
          {t("common.know")} <br className="lg:hidden" />
          <strong className="pointer-events-none border-none">HYDROTEK</strong>
        </h1>
        <p className="sm:text-sm xl:text-sm">{t("about.content")}</p>
        <p className="sm:text-sm xl:text-sm">{t("about.content2")}</p>
        <p className="sm:text-sm xl:text-sm">{t("about.content3")}</p>
        <p className="sm:text-sm xl:text-sm">{t("about.content4")}</p>
        <p className="sm:text-sm xl:text-sm">{t("about.content5")}</p>
        <p className="sm:text-sm xl:text-sm">{t("about.content6")}</p>
        <img
          src={borders.aboutUs}
          className="absolute -bottom-10 -right-10 hidden w-[300px] -rotate-90 animate-pulse xl:inline"
        />
      </section>
      <section className="relative mt-2 w-full p-6">
        <img src={backgrounds.signUpBgXl2} className="absolute -z-10 hidden scale-90 xl:block" />

        <img src={products.aboutUs} className="mx-auto w-full max-w-[400px]" />
      </section>
    </main>
  );
}
