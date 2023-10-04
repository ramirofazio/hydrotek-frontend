import { t } from "i18next";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button } from "src/components/buttons";

export function MySavedPosts() {
  const savedPosts = useSelector((s) => s.user.savedPosts);

  return (
    <main className="mx-8 grid place-items-center gap-2 overflow-hidden text-center sm:w-full sm:px-6 lg:mb-10  lg:w-full lg:place-items-start lg:pr-6">
      <h1 className="border-gold leading-5">{t("profile.savedPosts")}</h1>
      <div className="hidden w-full border-b-2 border-gold lg:inline" />
      <p className="mb-6">{t("profile.seeSavedPosts")}</p>
      <section className="grid w-full gap-4 py-4 sm:grid-cols-2 sm:gap-10  lg:h-screen lg:overflow-y-scroll lg:pb-20 lg:pr-2">
        {savedPosts.map(({ id, title }, index) => (
          <article
            key={index}
            className="relative grid place-items-start gap-6 rounded-xl border-4 border-gold  p-6 lg:h-60"
          >
            <h2 className="">13-09-23 {/*{date}*/}</h2>
            <h1 className="textGoldGradient">{title}</h1>
            <NavLink
              to={`/blog/post/${id}`}
              className={
                "textGoldGradient border-b-[1px] border-gold transition hover:cursor-pointer hover:opacity-50 lg:mt-0 lg:text-xs"
              }
            >
              DETALLES
            </NavLink>
          </article>
        ))}
        {!savedPosts.length && (
          <div className="col-span-2 flex w-full flex-col gap-4">
            <i className="ri-shopping-bag-fill icons text-4xl text-white" />
            <h2>Ninguna publicación guardada</h2>
            <Link to="/blog">
              <Button text={"Ver nuestro blog"} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
