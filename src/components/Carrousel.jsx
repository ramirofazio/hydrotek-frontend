import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export function Carrousel({ content }) {
  /*
  ! EXAMPLE CONTENT:
  const content = [{component: <ProductCard ...props />, qty: 5}] //! Generate 5 slides with ProductCard Component
  */

  // Crear un array de componentes repetidos basado en qty
  const repeatedContent = content.flatMap(({ component, qty }) => Array.from({ length: qty }, () => component));

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
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={pagination}
      slidesPerView={1}
      spaceBetween={20}
      centeredSlides={true}
      modules={[Pagination, Autoplay]}
      className="w-full mb-10 border-2 border-black"
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 70,
        },
      }}
    >
      {repeatedContent.map((component, index) => (
        <SwiperSlide key={index} className="grid place-items-center py-2 border-2 border-red-500">
          {({ isActive }) => (
            <div
              className={`${
                isActive ? "mt-5 opacity-100" : "pointer-events-none opacity-30 blur-sm"
              } grid h-full w-full place-items-center p-2 transition`}
            >
              {component}
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
