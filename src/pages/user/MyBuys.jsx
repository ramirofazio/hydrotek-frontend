import { t } from "i18next";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RoundedGoldGradientBorder } from "src/components/border";

export function MyBuys() {
  const orders = useSelector((s) => s.user.profile.orders);

  return (
    <main className="mx-8 grid place-items-center gap-2 overflow-hidden text-center sm:w-full sm:px-6 lg:mb-10  lg:w-full lg:place-items-start lg:pr-6">
      <h1 className="border-gold leading-5">{t("profile.myBuys")}</h1>
      <div className="hidden w-full border-b-2 border-gold lg:inline" />
      <p className="mb-6">{t("profile.consultHistory")}</p>
      <section className="grid w-full gap-4 py-4 sm:grid-cols-2 sm:gap-10 lg:flex lg:h-screen lg:flex-col lg:gap-3 lg:overflow-y-scroll lg:pb-20 lg:pr-2">
        {orders.map(({ id, img }, index) => (
          <article
            key={index}
            className="grid place-items-center rounded-xl border-4  border-gold p-6 lg:col-span-2  lg:flex lg:justify-between lg:py-4"
          >
            <RoundedGoldGradientBorder width={"w-24 lg:w-20"} blueGradient={false}>
              <img src={img} className="aspect-square h-full w-full rounded-full object-contain" />
            </RoundedGoldGradientBorder>
            <div className="lg:flex lg:flex-1 lg:flex-col lg:items-start lg:pl-5">
              <h2 className="mt-2">13-09-23</h2>
              <h2>
                {t("profile.order")} #{id}
              </h2>
            </div>
            <NavLink
              to={`order/${id}`}
              className={
                "textGoldGradient mt-4 border-b-[1px] border-gold transition hover:cursor-pointer hover:opacity-50 lg:mt-0 lg:text-xs"
              }
            >
              DETALLES
            </NavLink>
          </article>
        ))}
      </section>
    </main>
  );
}
