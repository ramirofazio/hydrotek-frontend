import { ProductDescription, Review } from "components";
import { useTranslation } from "react-i18next";
import { products } from "assets";

export default function ProductDetail() {
  const { t } = useTranslation();
  return (
    <main className="content mx-auto my-5 grid w-[92%] gap-8  md:grid-cols-2">
      {/* <Carrousel //? Resolver incorporación del carrucel
        content={[
          {
            component: (
              <div className="flex h-full min-h-[150px] w-full min-w-[150px] items-center justify-center bg-productBorderGradient bg-contain bg-clip-content bg-center bg-no-repeat">
                <img src={product} alt="foto del producto" className="m-10 w-[40%] md:m-20" />
              </div>
            ),
            qty: 3,
          },
        ]}
      /> */}
      <picture className="flex h-full min-h-[150px] w-full min-w-[150px] items-center justify-center  bg-productBorderGradient bg-contain bg-clip-content bg-center bg-no-repeat">
        <img src={products.defaultOne} alt="foto del producto" className="m-10 w-[40%]  md:w-[60%] lg:w-[50%]" />
      </picture>
      <ProductDescription />
      <section className="border-t-[1px] border-gold py-5  md:col-span-2">
        <h1 className="mx-auto mb-4 w-fit">{t("common.reviews")}</h1>
        <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Review />
          <Review />
          <Review />
          <Review />
        </div>
      </section>
    </main>
  );
}
