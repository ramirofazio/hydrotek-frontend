import { InfoCard, ProductCard, CategoryCard, BlogPostCard } from "src/components/cards";
import { Button } from "components/buttons";
import { Carrousel } from "src/components";
import { useTranslation } from "react-i18next";
import { backgrounds, products } from "assets";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { mostSelled } from "./mostSelled";
import { ValidateModal } from "./ValidateModal";

export default function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // TODO consumir los productos mas vendidos del back
  const mostSelledProducts = mostSelled;

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + "</div>";
    },
  };

  return (
    <div className="content h-full">
      <ValidateModal />
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
            className="mb-10 w-full"
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
            {mostSelledProducts?.length &&
              mostSelledProducts.map((p, i) => (
                <SwiperSlide key={i} className="grid place-items-center">
                  <ProductCard id={i} key={i} name={p.name} imgUrl={p.imgUrl} /* price={p.price.d[0]}  */ />
                </SwiperSlide>
              ))}
          </Swiper>
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
