import { ProductCard } from "src/components/cards";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ValidateModal } from "./ValidateModal";
import { useLoaderData } from "react-router-dom";
import FirstLandingSection from "./FirstLandingSection";
import { Text } from "src/components/text/Text";

export default function Landing() {
  document.title = "Hydrotek";

  const { t } = useTranslation();
  const featuredProducts = useLoaderData();

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + "</div>";
    },
  };

  return (
    <div className="content mx-5 h-full lg:mx-10 xl:mx-24">
      <ValidateModal />
      <section className="flex flex-col">
        <FirstLandingSection />

        {featuredProducts?.length > 0 && (
          <div className="py-10 sm:py-20">
            <Text Tag="h2" className="text-center text-2xl" content={t("common.top-sellers")} />
            <Swiper
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              pagination={pagination}
              slidesPerView={1}
              spaceBetween={20}
              centeredSlides={true}
              modules={[Pagination, Autoplay]}
              className="mb-10 w-full overflow-visible"
              breakpoints={{
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 100,
                },
              }}
            >
              {featuredProducts.map((p, i) => (
                <SwiperSlide key={i} className="grid place-items-center pb-20">
                  <ProductCard
                    id={p.id}
                    key={i}
                    name={p.name}
                    images={p.images}
                    price={p.arsPrice.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
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
