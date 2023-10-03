import { InfoCard, ProductCard, CategoryCard, BlogPostCard } from "src/components/cards";
import { Button } from "components/buttons";
import { Carrousel } from "src/components";
import { useTranslation } from "react-i18next";
import { backgrounds } from "assets";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  /* useEffect(() => {
    cleanStorage(); // ! Borrar cuanod se mergee HYD-113, interrumpe el flujo del token y del shoppingCart sin logueo
  }, []); */

  return (
    <div className="content h-full">
      <section className=" flex flex-col gap-[5rem]">
        <section className="flex flex-col pt-5 lg:flex-row lg:place-items-center lg:pt-10">
          <InfoCard />
          <img src={backgrounds.goldCircuit} className="place-self-end  md:w-[70%] lg:w-[45%] lg:place-self-center" />
        </section>
        <div className="py-10">
          <h1 className="mx-auto mb-10 w-fit xl:text-3xl">{t("common.top-sellers")}</h1>
          <Carrousel content={[{ component: <ProductCard name={"SAFE ROOTS"} price={"$20.000"} />, qty: 6 }]} quantit />
        </div>
        <div className="">
          <h1 className="mx-auto w-fit text-center xl:text-3xl">{t("common.find-what-you-are-looking")}</h1>
          <Carrousel
            content={[
              { component: <CategoryCard name={"SAFE ROOTS"} />, qty: 3 },
              { component: <CategoryCard name={"SAFE ROOTS"} />, qty: 3 },
            ]}
            quantit
          />
        </div>
        <div className="grid place-items-center gap-10 lg:grid-cols-3">
          <BlogPostCard title="COMO SETEAR EL SISTEMA EN" />
          <BlogPostCard title="COMO SETEAR EL SISTEMA EN" />
          <BlogPostCard title="COMO SETEAR EL SISTEMA EN" />
        </div>
        <Button
          onClick={() => navigate("/blog")}
          className="mx-auto -mt-[3rem] mb-[3rem] w-fit"
          text={t("blog.visit-blog")}
        />
      </section>
    </div>
  );
}
