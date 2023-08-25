import testFoto from "assets/goldCircuit1.png";
import { InfoCard, ProductCard, CategoryCard } from "src/components/cards";
import { Carrousel } from "src/components";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const { t } = useTranslation();
  return (
    <div className="content h-full ">
      <section className=" flex flex-col gap-[5rem]">
        <section className="flex flex-col pt-5 lg:flex-row lg:place-items-center lg:pt-10">
          <InfoCard />
          <img src={testFoto} className="place-self-end  md:w-[70%] lg:w-[45%] lg:place-self-center" />
        </section>
        <div className="py-10">
          <h1 className="mx-auto mb-10 w-fit xl:text-3xl">{t("common.top-sellers")}</h1>
          <Carrousel content={[{ component: <ProductCard name={"SAFE ROOTS"} price={"$20.000"} />, qty: 3 }]} quantit />
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
      </section>
    </div>
  );
}
