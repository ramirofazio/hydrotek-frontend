import { t } from "i18next";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RoundedGoldGradientBorder } from "src/components";

export function MyBuys() {
  const orders = useSelector((s) => s.user.profile.orders);

  return (
    <main className="mx-6 grid place-items-center gap-2 text-center">
      <h1 className="leading-5">{t("profile.myBuys")}</h1>
      <p className="mb-6">{t("profile.consultHistory")}</p>
      <section className="grid w-full gap-4 py-4">
        {orders.map(({ id, date, img }, index) => (
          <article key={index} className="grid place-items-center rounded-xl border-4  border-gold p-6">
            <RoundedGoldGradientBorder width={"w-24"}>
              <img src={img} className="aspect-square h-full w-full rounded-full object-contain" />
            </RoundedGoldGradientBorder>
            <h2 className="mt-2">13-09-23</h2>
            <h2>
              {t("profile.order")} #{id}
            </h2>
            <NavLink
              to={`order/${id}`}
              className={
                "textGoldGradient mt-4 border-b-[1px] border-gold transition hover:cursor-pointer hover:opacity-50"
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
