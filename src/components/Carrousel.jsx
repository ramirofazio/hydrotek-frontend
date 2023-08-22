import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export default function SwiperComponent({ content }) {
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
    <>
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
        className="mt-12 h-full w-full"
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {repeatedContent.map((component, index) => (
          <SwiperSlide key={index} className="grid h-[60vh] place-items-center">
            {({ isActive }) => (
              <div
                className={`${
                  isActive ? "opacity-100" : "pointer-events-none opacity-30 blur-sm"
                } grid h-full w-full place-items-center p-2 transition`}
              >
                {component}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
