import { InfoCard, ProductCard, CategoryCard, BlogPostCard } from "src/components/cards";
import { Button } from "components/buttons";
import { Carrousel } from "src/components";
import { useTranslation } from "react-i18next";
import { backgrounds } from "assets";
import { useNavigate } from "react-router-dom";
import { products } from "src/assets";

export default function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  /* useEffect(() => {
    cleanStorage(); // ! Borrar cuanod se mergee HYD-113, interrumpe el flujo del token y del shoppingCart sin logueo
  }, []); */

  return (
    <div className="content h-full">
      <section className=" flex flex-col gap-[5rem]">
        <section className="relative flex flex-col pt-5  lg:flex-row lg:place-items-center lg:pt-10">
          <InfoCard />
          <img
            src={products.aboutUs}
            className="absolute inset-x-0 bottom-0 z-20 mx-auto -mb-32 scale-75 lg:inset-x-auto  lg:inset-y-0 lg:bottom-auto lg:right-10 lg:top-20 lg:mb-auto  xl:right-20 xl:scale-100"
          />
          <img
            src={backgrounds.goldCircuit}
            className="animate-pulse  place-self-end md:w-[70%] lg:w-[45%] lg:place-self-center"
          />
        </section>
        <div className="py-10">
          <h1 className="mx-auto mb-10 w-fit xl:text-3xl">{t("common.top-sellers")}</h1>
          <Carrousel content={[{ component: <ProductCard name={"SAFE ROOTS"} price={"$20.000"} />, qty: 6 }]} />
        </div>
        {/* <div className="">
          <h1 className="mx-auto w-fit text-center xl:text-3xl">{t("common.find-what-you-are-looking")}</h1>
          <Carrousel
            content={[
              { component: <CategoryCard name={"SAFE ROOTS"} />, qty: 3 },
              { component: <CategoryCard name={"SAFE ROOTS"} />, qty: 3 },
            ]}
            quantit
          />
        </div>
        <div className="mx-auto grid w-[90%] place-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <BlogPostCard showSave={false} showPreview={false} title="COMO SETEAR EL SISTEMA EN" />
          <BlogPostCard showSave={false} showPreview={false} title="COMO SETEAR EL SISTEMA EN" />
          <BlogPostCard showSave={false} showPreview={false} title="COMO SETEAR EL SISTEMA EN" />
        </div>
        <Button
          onClick={() => navigate("/blog")}
          className="mx-auto -mt-[3rem] mb-[3rem] w-fit"
          text={t("blog.visit-blog")}
        /> */}
      </section>
    </div>
  );
}
