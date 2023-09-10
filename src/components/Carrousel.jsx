import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export function Carrousel({ content }) {
  /*
  ! EXAMPLE CONTENT:
  const content = [{component: <ProductCard ...props />, qty: 5}] //! Generate 5 slides with ProductCard Component
  */

  // Crear un array de componentes repetidos basado en qty
  const repeatedContent = content?.flatMap(({ component, qty }) => Array.from({ length: qty }, () => component));

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + "</div>";
    },
  };

  return (
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
      {repeatedContent?.map((component, index) => (
        <SwiperSlide key={index} className="grid place-items-center">
          {({ isActive }) => (
            <div
              className={`${
                isActive ? "mt-5 opacity-100" : "pointer-events-none opacity-80 "
              } grid h-full w-full place-items-center p-2 transition md:w-[50%] lg:w-[80%] xl:w-full`}
            >
              {component}
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
