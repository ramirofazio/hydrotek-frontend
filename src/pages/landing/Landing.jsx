import testFoto from "../../assets/goldCircuit1.png";
import { InfoCard, ProductCard, CategoryCard } from "../../components/cards";
import { Carrousel } from "../../components";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const { t } = useTranslation();
  return (
    <div className="content h-full ">
      <section className=" flex flex-col gap-[5rem]">
        <section className="flex flex-col  lg:flex-row lg:place-items-center lg:pt-20">
          <InfoCard />
          <img src={testFoto} className="place-self-end  md:w-[70%] lg:w-[45%] lg:place-self-center" />
        </section>
        <div className="">
          <h1 className="mx-auto mb-10 w-fit xl:text-3xl">{t("common.top-sellers")}</h1>
          <Carrousel
            content={[
              { component: <ProductCard imgUrl={testFoto} name={"CIRCUIT"} price={"$5.000"} />, qty: 3 },
              { component: <ProductCard name={"SAFE ROOTS"} price={"$20.000"} />, qty: 3 },
            ]}
            quantit
          />
        </div>
        <div className="">
          <h1 className="mx-auto w-fit xl:text-3xl">{t("common.top-sellers")}</h1>
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
