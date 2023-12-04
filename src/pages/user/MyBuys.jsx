import { t } from "i18next";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import { logos } from "src/assets";
import { RoundedGoldGradientBorder } from "src/components/border";
import { Button } from "src/components/buttons";

export function MyBuys() {
  const orders = useLoaderData();

  return (
    <main className="mx-8 grid place-items-center gap-2 overflow-hidden text-center sm:w-full sm:px-6 lg:mb-10  lg:w-full lg:place-items-start lg:pr-6">
      <h1 className="border-gold leading-5">{t("profile.myBuys")}</h1>
      <div className="hidden w-full border-b-2 border-gold lg:inline" />
      <p className="mb-6">{t("profile.consultHistory")}</p>
      <section className="grid w-full gap-4 py-4 sm:grid-cols-2 sm:gap-10 lg:flex lg:h-screen lg:flex-col lg:gap-3 lg:overflow-y-scroll lg:pb-20 lg:pr-2">
        {orders.map(({ fresaId, products, date }, index) => (
          <article
            key={index}
            className="grid place-items-center rounded-xl border-4  border-gold p-6 lg:col-span-2  lg:flex lg:justify-between lg:py-4"
          >
            <RoundedGoldGradientBorder width={"w-24 lg:w-20"} blueGradient={false}>
              <img
                src={products[0].product.images[0]?.path || logos.hydBlack}
                className="aspect-square h-full w-full rounded-full object-contain"
              />
            </RoundedGoldGradientBorder>
            <div className="lg:flex lg:flex-1 lg:flex-col lg:items-start lg:pl-5">
              <h2 className="mt-2">{new Date(date).toLocaleDateString()}</h2>
              <h2>
                {t("profile.order")} #{fresaId}
              </h2>
            </div>
            <NavLink
              to={`order/${fresaId}`}
              className={
                "textGoldGradient mt-4 border-b-[1px] border-gold transition hover:cursor-pointer hover:opacity-50 lg:mt-0 lg:text-xs"
              }
            >
              DETALLES
            </NavLink>
          </article>
        ))}
        {!orders.length && (
          <div className="col-span-2 flex w-full flex-col gap-4">
            <i className="ri-shopping-bag-fill icons text-4xl text-white" />
            <h2>Ninguna compra realizada</h2>
            <Link to="/products/0">
              <Button text={"Ver productos"} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
